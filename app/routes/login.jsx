import LoginForm from '../components/auth/LoginForm';

import { loginAction } from '../loaders/login';

export { loginAction as action };

const LoginPage = () => {
  return (
    <div>
      <h1>Please login to access TrashQuest !</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
