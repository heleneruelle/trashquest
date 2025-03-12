import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from '@remix-run/react';
import MultiSelect from './MultiSelect';

type Option = {
  value: string;
  label: string;
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

function MultiSelectInput({
  id,
  defaultOptions,
  placeholder,
  label,
}: {
  id: string;
  defaultOptions: Option[];
  placeholder: string;
  label: string;
}) {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const searchParamForId = searchParams.get(id);

  const [selectedOptions, setSelectedOptions] = useState(
    getOptionsFromSearchParams(searchParamForId, defaultOptions)
  );

  return (
    <label className="multi-select-input">
      <strong>{label}</strong>
      <MultiSelect
        onChange={setSelectedOptions}
        options={getTranslatedLabelsForOptions(defaultOptions, t)}
        value={getTranslatedLabelsForOptions(selectedOptions, t)}
        placeholder={placeholder}
      />
      <input
        type="hidden"
        name={id}
        value={selectedOptions.map((e) => e.value)}
      />
    </label>
  );
}

export default MultiSelectInput;
