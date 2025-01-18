import { useTranslation } from 'react-i18next';
import SignUpForm from '~/components/forms/SignUpForm';
import ImageLayout from '~/components/templates/ImageLayout';
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';

//c
const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <TwoColumnsLayout>
      <div className="signup-form">
        <h1>{t('welcome')}</h1>
        <h3>{t('create-new-account.description')}</h3>
        <SignUpForm />
      </div>
      <ImageLayout />
    </TwoColumnsLayout>
  );
};

export default SignUpPage;
