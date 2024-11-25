import type { ActionFunctionArgs } from '@remix-run/node';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { redirect } from '@remix-run/node';

export async function signupAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const username = String(formData.get('username'));
  const location = String(formData.get('location'));

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
        username: username,
        location: location,
        createdAt: serverTimestamp(),
      });
      console.log('User registered and added to Firestore:', user.uid);
      return redirect('/login');
    } catch (firestoreError) {
      // If Firestore document creation fails, delete the authenticated user
      console.error('Error adding user to Firestore:', firestoreError);

      try {
        await deleteUser(user);
        console.log('Rolled back user from Firebase Authentication.');
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
      { error: 'User registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
