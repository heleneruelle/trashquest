import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <div>
      <p className="about__description">{t('description')}</p>
    </div>
  );
}

export default About;
