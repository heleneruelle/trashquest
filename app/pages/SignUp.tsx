import { useTranslation } from 'react-i18next';
import SignUpForm from '~/components/auth/SignUpForm';
import ImageLayout from '~/components/templates/ImageLayout';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <ImageLayout>
      <h1>{t('welcome')}</h1>
      <h3>{t('create-new.description')}</h3>
      <SignUpForm />
    </ImageLayout>
  );
};

export default SignUpPage;
