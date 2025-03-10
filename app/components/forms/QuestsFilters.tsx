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
          placeholder={t('quest.placeholder.environment')}
          label={t('quest.environment')}
          defaultOptions={environmentOptions}
          id="environment"
        />
        <MultiSelectInput
          placeholder={t('quest.placeholder.equipment')}
          label={t('quest.equipment')}
          defaultOptions={equipmentOptions}
          id="equipment"
        />
        <MultiSelectInput
          placeholder={t('quest.placeholder.accessibility')}
          label={t('quest.accessibility')}
          defaultOptions={accessibilityOptions}
          id="accessibility"
        />
      </div>
      <button
        type="submit"
        aria-label={t('quest.filter.cta')}
        className="quests-filters__button"
      >
        <FaSliders size={20} aria-hidden={true} />
      </button>
    </form>
  );
}

export default QuestsFilters;
