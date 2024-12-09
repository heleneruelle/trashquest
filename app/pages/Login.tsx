import LoginForm from '~/components/auth/LoginForm';
import { useTranslation } from 'react-i18next';
import ImageLayout from '~/components/templates/ImageLayout'

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <ImageLayout>
      <h1>{t('login.title')}</h1>
      <LoginForm />
    </ImageLayout>
  );
};

export default LoginPage;
