import { useSearchParams } from '@remix-run/react';
import SelectWithTags from '../inputs/SelectWithTags';
import Button from '../inputs/Button';
import { questEnvironment, questEquipment, questAccessibility } from '~/config';

function QuestsFilters() {
  const [searchParams] = useSearchParams();
  const environment = searchParams.get('environment');
  const equipment = searchParams.get('equipment');
  const accessibility = searchParams.get('accessibility');

  return (
    <form method="get" className="quests-filters">
      <SelectWithTags
        options={questEnvironment}
        defaultOptions={environment?.split(',')}
        fieldset="environment"
        label={"Type d'environnement"}
      />
      <SelectWithTags
        options={questEquipment}
        defaultOptions={equipment?.split(',')}
        fieldset="equipment"
        label={'Equipment'}
      />
      <SelectWithTags
        options={questAccessibility}
        defaultOptions={accessibility?.split(',')}
        fieldset="accessibility"
        label={'Accessibility'}
      />
      <Button type="submit" label="Filter quests" />
    </form>
  );
}

export default QuestsFilters;
