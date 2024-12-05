import SignUpForm from '~/components/auth/SignUpForm';
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <h3>{t('create-new.description')}</h3>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
