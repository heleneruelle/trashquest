import { getAuth, signOut } from 'firebase/auth';

const asyncSignOut = async () => {
  const auth = getAuth();
  try {
    // Tentative de déconnexion
    await signOut(auth);
    console.log('Sign out successful');
  } catch (error) {
    // Log des détails de l'erreur
    console.error('Sign out failed', error.message, error.code);
  }
};

export default asyncSignOut;
