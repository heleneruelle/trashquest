import React, { ChangeEventHandler } from 'react';

interface Option {
  id: string | number;
  value: string;
  name: string;
}

interface SelectProps {
  options: Option[];
  name: string;
  id: string;
  hint: string | null;
  changeCallback?: ChangeEventHandler<HTMLSelectElement> | undefined;
  defaultValue?: string | undefined;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, name, id, hint, changeCallback, defaultValue }, ref) => {
    return (
      <div className="select-container">
        <label htmlFor={id}>{name}</label>
        <select
          name={id}
          id={id}
          ref={ref}
          defaultValue={defaultValue}
          onChange={changeCallback}
        >
          {options.map((option) => (
            <option value={option.value} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {hint && <small className="input-hint">{hint}</small>}
      </div>
    );
  }
);

export default Select;
