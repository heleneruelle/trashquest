import { useSearchParams } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import SelectWithTags from '../inputs/SelectWithTags';
import Button from '../inputs/Button';
import { questEnvironment, questEquipment, questAccessibility } from '~/config';

function QuestsFilters() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const environment = searchParams.get('environment');
  const equipment = searchParams.get('equipment');
  const accessibility = searchParams.get('accessibility');

  return (
    <form method="get" className="quests-filters">
      <SelectWithTags
        options={questEnvironment}
        defaultOptions={environment?.split(',')}
        fieldset="environment"
        label={t('quest.environment')}
      />
      <SelectWithTags
        options={questEquipment}
        defaultOptions={equipment?.split(',')}
        fieldset="equipment"
        label={t('quest.equipment')}
      />
      <SelectWithTags
        options={questAccessibility}
        defaultOptions={accessibility?.split(',')}
        fieldset="accessibility"
        label={t('quest.accessibility')}
      />
      <Button type="submit" label={t('quest.filter.cta')} />
    </form>
  );
}

export default QuestsFilters;
