import LoginForm from '~/components/auth/LoginForm';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('login.title')}</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
