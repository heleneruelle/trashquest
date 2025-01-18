import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { getSession, commitSession } from '~/utils/auth/session.server';
import i18nServer from '~/i18n.server';
import createCompositeUrl from '~/utils/url/createCompositeUrl';

export async function signupAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const passwordConfirm = String(formData.get('password-confirm'));

  if (password !== passwordConfirm) {
    return Response.json({ error: 'password' }, { status: 400 });
  }

  const username = String(formData.get('username'));
  const locationName = String(formData.get('locationName'));
  const locationId = String(formData.get('locationId'));
  const locationLatitude = Number(formData.get('locationLatitude'));
  const locationLongitude = Number(formData.get('locationLongitude'));
  const country = String(formData.get('country'));

  if (!locationId) {
    return Response.json({ error: 'location' }, { status: 400 });
  }

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    try {
      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        username,
        country,
        location: {
          name: locationName,
          id: locationId,
          latitude: locationLatitude,
          longitude: locationLongitude,
        },
        createdAt: serverTimestamp(),
      });
      const session = await getSession();
      session.set('userId', user.uid);
      return redirect(createCompositeUrl(i18nServer, '/'), {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    } catch (firestoreError) {
      // If Firestore document creation fails, delete the authenticated user
      console.error('Error adding user to Firestore:', firestoreError);

      try {
        await deleteUser(user);
      } catch (rollbackError) {
        console.error(
          'Failed to rollback user from Firebase Authentication:',
          rollbackError
        );
      }

      throw new Error(
        'Failed to complete user registration. Please try again.'
      );
    }
  } catch (authError) {
    console.error('Error during user registration:', authError);
    return Response.json(
      {
        error:
          authError instanceof Error
            ? authError.message
            : 'User registration failed. Please try again.',
      },
      { status: 500 }
    );
  }
}
