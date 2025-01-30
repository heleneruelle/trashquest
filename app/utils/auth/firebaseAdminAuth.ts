import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}'
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error('Token invalid or expired');
  }
};

export { admin, db, verifyIdToken };
