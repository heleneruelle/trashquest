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

function Home() {
  const { t } = useTranslation();
  return (
    <div className="home-container">
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
      <h1>Rejoignez TrashQuest et agissez pour la planète !</h1>
      <p>
        Organisez ou rejoignez des nettoyages — ou "quêtes" — pour débarrasser
        parcs, rues et rivières des déchets. Suivez vos progrès, montez en
        niveau et faites partie d’un mouvement écologique citoyen. Ensemble,
        transformons nos espaces publics !
      </p>
      <Carousel images={images} />
    </div>
  );
}

export default Home;
