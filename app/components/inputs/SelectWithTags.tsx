import { useState } from 'react';
import Tag from './Tag';

interface SelectWithTagsProps {
  options: Array<string>;
  singleOption?: boolean;
  fieldset: string;
  label: string;
  hint?: string;
  defaultOptions?: Array<string>;
}

function SelectWithTags({
  options,
  singleOption = false,
  fieldset,
  label,
  hint,
  defaultOptions = [],
}: SelectWithTagsProps) {
  const [chosenOptions, setChosenOptions] = useState(defaultOptions);

  const handleAddTag = (e) => {
    setChosenOptions((prev) => {
      if (singleOption) {
        return [e.target.value];
      }
      return [...prev, e.target.value];
    });
  };

  const handleRemoveTag = (e) => {
    setChosenOptions((prev) => {
      return prev.filter((el) => el !== e.target.value);
    });
  };

  return (
    <div className="select-with-tags">
      <label htmlFor={`select-tags-${fieldset}`}>{label}</label>
      {hint && <small className="input-hint">{hint}</small>}
      <ul className="select-tags">
        {options.map((tag) => (
          <li key={tag}>
            <Tag
              name={tag}
              id={tag}
              callback={
                chosenOptions.includes(tag) ? handleRemoveTag : handleAddTag
              }
              selected={chosenOptions.includes(tag)}
            />
          </li>
        ))}
      </ul>
      <input
        type="text"
        multiple
        id={fieldset}
        name={fieldset}
        value={chosenOptions}
        onChange={() => {}}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default SelectWithTags;
