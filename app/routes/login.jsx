import { useUser } from '../utils/auth/user';
import LoginForm from '../components/auth/LoginForm';
import { getAuth, signOut } from 'firebase/auth';

import { loginAction } from '../loaders/login';

export { loginAction as action };

const LoginPage = () => {
  const user = useUser();
  const auth = getAuth();

  const asyncSignOut = async (e) => {
    signOut(auth)
      .then(() => {
        console.log('Sign out successfull');
      })
      .catch((error) => {
        console.error('Sign out not succesful');
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={asyncSignOut}>Log Out</button>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default LoginPage;
