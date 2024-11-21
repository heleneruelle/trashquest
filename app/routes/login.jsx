import { useUser } from '../utils/auth/user';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const user = useUser();

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={() => signOut(auth)}>Log Out</button>
        </div>
      ) : (
        <LoginForm setUser={(user) => setUser(user)} />
      )}
    </div>
  );
};

export default LoginPage;
