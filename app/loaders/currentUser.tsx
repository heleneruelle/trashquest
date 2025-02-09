import { db } from '~/utils/auth/firebaseAdminAuth';
import { getCookie } from '~/utils/cookies';
import { verifyIdToken } from '~/utils/auth/firebaseAdminAuth';

async function currentUserLoader({ request }: { request: Request }) {
  try {
    const userToken = await getCookie(request, 'firebase_token');
    const verifiedUser = await verifyIdToken(userToken);

    const userDocRef = db.collection('users').doc(verifiedUser?.uid);

    const userData = await userDocRef
      .get()
      .then((userDoc) => {
        if (userDoc.exists) {
          return userDoc.data();
        } else {
          throw new Error(`No user document for id : ${verifiedUser?.uid}`);
        }
      })
      .catch((userDocError) => {
        throw new Error(`Error getting user document: ${userDocError}`);
      });

    return Response.json({ success: true, user: userData }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default currentUserLoader;
