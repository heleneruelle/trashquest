import LoginForm from '~/components/auth/LoginForm';
import ImageLayout from '~/components/templates/ImageLayout';

import { loginAction } from '../loaders/login';

export { loginAction as action };

const LoginPage = () => {
  return (
    <ImageLayout>
      <h1>Please login to access TrashQuest !</h1>
      <LoginForm />
    </ImageLayout>
  );
};

export default LoginPage;
