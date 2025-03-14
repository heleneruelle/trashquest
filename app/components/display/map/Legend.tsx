import { useTranslation } from 'react-i18next';
import { PiSword } from 'react-icons/pi';
import { TiWaves } from 'react-icons/ti';
import { MdLocationCity } from 'react-icons/md';
import { PiPersonSimpleHikeBold } from 'react-icons/pi';

function Legend() {
  const { t } = useTranslation();

  return (
    <div className="map-legend">
      <div className="map-legend__container">
        <strong>{t('map.legend.color.title')}</strong>
        <div className="map-legend__list">
          <div className="map-legend__item">
            <div className="quest-position-marker quest-position-marker__creator " />
            {t('map.legend.color.creator')}
          </div>
          <div className="map-legend__item">
            <div className="quest-position-marker quest-position-marker__closest" />
            {t('map.legend.color.closest')}
          </div>

          <div className="map-legend__item">
            <div className="quest-position-marker" />
            {t('map.legend.color.available')}
          </div>
        </div>
      </div>
      <div className="map-legend__container">
        <strong>{t('map.legend.environment.title')}</strong>
        <div className="map-legend__list">
          <div className="map-legend__item">
            <TiWaves size={15} />
            {t('map.legend.environment.water')}
          </div>
          <div className="map-legend__item">
            <MdLocationCity size={15} />
            {t('map.legend.environment.urban')}
          </div>
          <div className="map-legend__item">
            <PiPersonSimpleHikeBold size={15} />
            {t('map.legend.environment.hike')}
          </div>
          <div className="map-legend__item">
            <PiSword size={15} />
            {t('map.legend.environment.other')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legend;
