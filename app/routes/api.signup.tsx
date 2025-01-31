import { ActionFunction } from '@remix-run/node';
import { db, admin } from '~/utils/auth/firebaseAdminAuth';

export let action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.json();

    const {
      email,
      password,
      passwordConfirm,
      username,
      locationName,
      locationId,
      locationLatitude,
      locationLongitude,
      country,
    } = formData;

    if (password !== passwordConfirm) {
      throw new Error('Password does not match confirmation');
    }

    if (!locationId) {
      throw new Error('Location is unvalid');
    }

    const userRecord = await admin.auth().createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: username,
    });

    const userRef = admin.firestore().collection('users').doc(userRecord.uid);

    await userRef.set({
      email,
      username,
      country,
      location: {
        name: locationName,
        id: locationId,
        latitude: locationLatitude,
        longitude: locationLongitude,
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return Response.json({ success: true, userRecord });
  } catch (error) {
    return Response.json(
      { error: `Signup failed : ${error}` },
      { status: 500 }
    );
  }
};
