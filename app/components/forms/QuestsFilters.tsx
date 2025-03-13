import { useTranslation } from 'react-i18next';
import { FaSliders } from 'react-icons/fa6';
import MultiSelectInput from '../display/MultiSelectInput';
import {
  environmentOptions,
  equipmentOptions,
  accessibilityOptions,
} from '~/config';

function QuestsFilters() {
  const { t } = useTranslation();

  return (
    <form method="get" className="quests-filters">
      <div className="quests-filters__container">
        <MultiSelectInput
          placeholder={t('quest.environment')}
          defaultOptions={environmentOptions}
          listTitle={t('quest.placeholder.environment')}
          id="environment"
        />
        <MultiSelectInput
          placeholder={t('quest.equipment')}
          listTitle={t('quest.placeholder.equipment')}
          defaultOptions={equipmentOptions}
          id="equipment"
        />
        <MultiSelectInput
          placeholder={t('quest.accessibility')}
          listTitle={t('quest.placeholder.accessibility')}
          defaultOptions={accessibilityOptions}
          id="accessibility"
        />
      </div>
      <button
        type="submit"
        aria-label={t('quest.filter.cta')}
        className="quests-filters__button"
      >
        <FaSliders size={16} aria-hidden={true} />
        <p>{t('quest.filter.cta')}</p>
      </button>
    </form>
  );
}

export default QuestsFilters;
