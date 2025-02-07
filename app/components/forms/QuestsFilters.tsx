import SelectWithTags from '../inputs/SelectWithTags';
import { questEnvironment, questEquipment, questAccessibility } from '~/config';

function QuestsFilters() {
  return (
    <form method="get" style={{ padding: '20px', backgroundColor: 'beige' }}>
      <SelectWithTags
        options={questEnvironment}
        fieldset="environment"
        label={"Type d'environnement"}
      />
      <SelectWithTags
        options={questEquipment}
        fieldset="equipment"
        label={'Equipment'}
      />
      <SelectWithTags
        options={questAccessibility}
        fieldset="accessibility"
        label={'Accessibility'}
      />
      <button type="submit">Filtrer</button>
    </form>
  );
}

export default QuestsFilters;
