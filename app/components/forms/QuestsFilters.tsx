import { useSearchParams } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import Select from 'react-select';
import Button from '../inputs/Button';
import {
  environmentOptions,
  equipmentOptions,
  accessibilityOptions,
} from '~/config';

type Option = {
  value: string;
};

function getOptionsFromSearchParams(
  param: string | null,
  defaultOptions: Option[]
) {
  const parsedParam = !param || param === '' ? [] : param.split(',');
  return (
    parsedParam?.map((e) => defaultOptions.find((opt) => opt.value === e)) || []
  );
}

function getTranslatedLabelsForOptions(options, t) {
  return options.map((opt) => ({ ...opt, label: t(opt.label) }));
}

function QuestsFilters() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const environment = searchParams.get('environment');
  const equipment = searchParams.get('equipment');
  const accessibility = searchParams.get('accessibility');

  const [selectedEnvironmentOption, setSelectedEnvironmentOption] = useState(
    getOptionsFromSearchParams(environment, environmentOptions)
  );

  const [selectedEquipmentOption, setSelectedEquipmentOption] = useState(
    getOptionsFromSearchParams(equipment, equipmentOptions)
  );

  const [selectedAccessibilityOption, setSelectedAccessibilityOption] =
    useState(getOptionsFromSearchParams(accessibility, accessibilityOptions));

  return (
    <form method="get" className="quests-filters">
      <label>
        {t('quest.environment')}
        <Select
          defaultValue={getTranslatedLabelsForOptions(
            selectedEnvironmentOption,
            t
          )}
          onChange={setSelectedEnvironmentOption}
          options={getTranslatedLabelsForOptions(environmentOptions, t)}
          isMulti
          id="environment"
          placeholder={t('quest.environment')}
        />
        <input
          type="hidden"
          name="environment"
          value={selectedEnvironmentOption.map((e) => e.value)}
        />
      </label>

      <label>
        {t('quest.equipment')}
        <Select
          defaultValue={getTranslatedLabelsForOptions(
            selectedEquipmentOption,
            t
          )}
          onChange={setSelectedEquipmentOption}
          options={getTranslatedLabelsForOptions(equipmentOptions, t)}
          isMulti
          id="equipment"
          placeholder={t('quest.equipment')}
        />
        <input
          type="hidden"
          name="equipment"
          value={selectedEquipmentOption.map((e) => e.value)}
        />
      </label>

      <label>
        {t('quest.accessibility')}
        <Select
          defaultValue={getTranslatedLabelsForOptions(
            selectedAccessibilityOption,
            t
          )}
          onChange={setSelectedAccessibilityOption}
          options={getTranslatedLabelsForOptions(accessibilityOptions, t)}
          isMulti
          id="accessibility"
          placeholder={t('quest.accessibility')}
        />
        <input
          type="hidden"
          name="accessibility"
          value={selectedAccessibilityOption.map((e) => e.value)}
        />
      </label>
      <Button type="submit" label={t('quest.filter.cta')} />
    </form>
  );
}

export default QuestsFilters;
