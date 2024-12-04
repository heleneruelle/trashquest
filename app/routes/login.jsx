import LoginForm from '../components/auth/LoginForm';
import { useTranslation } from 'react-i18next';

import { loginAction } from '../loaders/login';

export { loginAction as action };

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
