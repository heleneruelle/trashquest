import { useTranslation } from 'react-i18next';
import LoginForm from '~/components/forms/LoginForm';
import ButtonLink from '~/components/inputs/ButtonLink';
import ImageLayout from '~/components/templates/ImageLayout';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <ImageLayout>
      <div className="login-form">
        <h1>{t('login.title')}</h1>
        <LoginForm />
        <ButtonLink
          target={createCompositeUrl(i18n, '/sign-up')}
          label={t('create-new-account.cta.create')}
          style="secondary"
        />
        {/* TODO : enable for no account (guest) */}
        {false && (
          <ButtonLink
            target={createCompositeUrl(i18n, '/home')}
            label={t('login.cta.test')}
            style="tertiary"
          />
        )}
      </div>
    </ImageLayout>
  );
};

export default LoginPage;
