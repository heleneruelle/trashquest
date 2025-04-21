import { useTranslation } from 'react-i18next';
import ButtonLink from '~/components/inputs/ButtonLink';
import Carousel from '~/components/display/Carousel';
import CarouselItem from '~/components/display/CarouselItem';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

function Welcome() {
  const { t } = useTranslation();
  return (
    <div className="welcome-container">
      <div className="auth-section">
        <ButtonLink target={createCompositeUrl(i18n, '/login')} style="primary">
          {t('login.cta.idle')}
        </ButtonLink>
        <ButtonLink
          target={createCompositeUrl(i18n, '/sign-up')}
          style="secondary"
        >
          {t('create-new-account.cta.create')}
        </ButtonLink>
      </div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
      <Carousel
        elements={[
          <CarouselItem
            imageUrl="/assets/trashquest-home.webp"
            title={t('welcome.introduction.home.title')}
            description={t('welcome.introduction.home.description')}
          />,
          <CarouselItem
            imageUrl="/assets/trashquest-create.webp"
            title={t('welcome.introduction.create.title')}
            description={t('welcome.introduction.create.description')}
          />,
          <CarouselItem
            imageUrl="/assets/trashquest-quest.webp"
            title={t('welcome.introduction.join.title')}
            description={t('welcome.introduction.join.description')}
          />,
          <CarouselItem
            imageUrl="/assets/trashquest-your-quest.webp"
            title={t('welcome.introduction.manage.title')}
            description={t('welcome.introduction.manage.description')}
          />,
        ]}
      />
    </div>
  );
}

export default Welcome;
