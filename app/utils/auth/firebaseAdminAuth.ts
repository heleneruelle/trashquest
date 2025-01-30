import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: applicationDefault(),
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
