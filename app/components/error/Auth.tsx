import { useTranslation } from 'react-i18next';
import { ImHeartBroken } from 'react-icons/im';

function Auth() {
  const { t } = useTranslation();
  return (
    <div className="error-boundary">
      <h1>{t('error.auth.title')}</h1>
      <ImHeartBroken size={30} />
      <p>{t('error.auth.description')}</p>
    </div>
  );
}

export default Auth;
