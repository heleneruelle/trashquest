import { getAuth, signOut } from 'firebase/auth';

const asyncSignOut = async () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      console.log('Sign out successfull');
    })
    .catch((error) => {
      console.error('Sign out not succesful');
    });
};

export default asyncSignOut;
