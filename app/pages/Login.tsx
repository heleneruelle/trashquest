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
        <div>
          <p style={{ margin: '6px 0px' }}>{t('login.temp.description')}</p>
          <ol style={{ margin: '0px' }}>
            <li style={{ fontWeight: 'bold' }}>{t('login.temp.userFr')}</li>
            <li style={{ fontWeight: 'bold' }}>{t('login.temp.userBe')}</li>
          </ol>
        </div>
        <LoginForm />
        <ButtonLink
          target={createCompositeUrl(i18n, '/sign-up')}
          style="secondary"
        >
          {t('create-new-account.cta.create')}
        </ButtonLink>
        {/* TODO : enable for no account (guest) */}
        {false && (
          <ButtonLink
            target={createCompositeUrl(i18n, '/home')}
            style="tertiary"
          >
            {t('login.cta.test')}
          </ButtonLink>
        )}
      </div>
    </ImageLayout>
  );
};

export default LoginPage;
