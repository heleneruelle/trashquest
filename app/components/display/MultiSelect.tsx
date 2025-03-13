import React, { useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  value: Option[];
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
  placeholder?: string;
  listTitle?: string;
  id: string;
  floating?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  options,
  onChange,
  placeholder,
  listTitle,
  id,
  floating,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleOptionToggle = (option: Option, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const isOptionSelected = value.some(
      (selected) => selected.value === option.value
    );

    if (isOptionSelected) {
      const updatedOptions = value.filter(
        (selected) => selected.value !== option.value
      );
      onChange(updatedOptions);
    } else {
      const updatedOptions = [...value, option];
      onChange(updatedOptions);
    }
  };

  const handleTagRemove = (option: Option, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const updatedOptions = value.filter(
      (selected) => selected.value !== option.value
    );
    onChange(updatedOptions);
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      !(
        event.target instanceof HTMLElement &&
        event.target.id === `multi-select-dropdown-${id}`
      )
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="multi-select-dropdown"
      id={`multi-select-dropdown-${id}`}
    >
      <div
        onClick={handleContainerClick}
        className={`multi-select-dropdown__input ${
          value?.length > 0 && 'multi-select-dropdown__input-hasValue'
        }`}
      >
        {value.length === 0 ? (
          <small className="multi-select-dropdown__placeholder">
            {placeholder}
          </small>
        ) : (
          <div className="multi-select-dropdown__tag-container">
            {value.map((option) => (
              <button
                type="button"
                key={option.value}
                className="multi-select-dropdown__tag"
                onClick={(event) => handleTagRemove(option, event)}
              >
                <span>{option.label}</span>
                <div className="multi-select-dropdown__tag-button">
                  <RxCross2 />
                </div>
              </button>
            ))}
          </div>
        )}

        <IoIosArrowDown
          className={`${isDropdownOpen && 'multi-select-dropdown__arrow-open'}`}
        />
      </div>
      {isDropdownOpen && (
        <div
          className={`multi-select-dropdown__list-container ${
            floating && 'floating'
          }`}
        >
          {listTitle ? <strong>{listTitle}</strong> : null}
          <ul className="multi-select-dropdown__list">
            {options.map((option) => (
              <li>
                <button
                  type="button"
                  key={option.value}
                  className="multi-select-dropdown__list-item"
                  onClick={(event) => handleOptionToggle(option, event)}
                >
                  <div className="radio-button__container">
                    {value.some(
                      (selected) => selected.value === option.value
                    ) && <div className="radio-button__selected" />}
                  </div>
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
