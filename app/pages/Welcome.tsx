import { useTranslation } from 'react-i18next';
import ButtonLink from '~/components/inputs/ButtonLink';
import Carousel from '~/components/display/Carousel';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/60/Naxos_Taverna.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/60/Naxos_Taverna.jpg',
];

function Welcome() {
  const { t } = useTranslation();
  return (
    <div className="welcome-container">
      <div className="auth-section">
        <ButtonLink
          target={createCompositeUrl(i18n, '/login')}
          label={t('login.cta.idle')}
          style="primary"
        />
        <ButtonLink
          target={createCompositeUrl(i18n, '/sign-up')}
          label={t('create-new-account.cta.create')}
          style="secondary"
        />
      </div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
      <Carousel images={images} />
    </div>
  );
}

export default Welcome;
