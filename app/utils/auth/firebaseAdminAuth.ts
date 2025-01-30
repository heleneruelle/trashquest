import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      privateKey: process.env.VITE_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.VITE_FIREBASE_CLIENT_EMAIL,
    }),
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

export { db, verifyIdToken };
