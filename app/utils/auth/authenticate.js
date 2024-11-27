import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

async function authenticate({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Authenticate function', error);
    return null;
  }
}

export default authenticate;
