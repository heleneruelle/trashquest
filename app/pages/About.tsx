import { useTranslation } from 'react-i18next';
import FeaturePlan from '~/components/display/FeaturePlan';

function About() {
  const { t } = useTranslation();

  return (
    <div className="about__container">
      <p className="about__description">{t('description')}</p>
      <div className="about__section-container">
        <div className="about__img" />
        <div className="about__section-content">
          <h3>{t('about.me.title')}</h3>
          <p>{t('about.me.content')}</p>
        </div>
      </div>
      <div className="about__section-container">
        <div className="about__section-content">
          <h3>Feature plan</h3>
          <FeaturePlan />
        </div>
      </div>
    </div>
  );
}

export default About;
