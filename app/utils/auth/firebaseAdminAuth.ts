import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credentials) {
  throw new Error(
    "La variable d'environnement GOOGLE_APPLICATION_CREDENTIALS est manquante."
  );
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(credentials);
} catch (error) {
  throw new Error(
    'Erreur lors du parsing de la variable GOOGLE_APPLICATION_CREDENTIALS.'
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
