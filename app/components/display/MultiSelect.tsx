import React, { useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  value: Option[];
  options: Option[];
  onChange: (selectedOptions: Option[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  options,
  onChange,
  placeholder,
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
      !(event.target as HTMLElement)?.closest('.multi-select-dropdown')
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
    <div ref={containerRef} className="multi-select-dropdown">
      <div
        onClick={handleContainerClick}
        className="multi-select-dropdown__input"
      >
        {value.map((option) => (
          <button
            type="button"
            key={option.value}
            className="multi-select-dropdown__tag"
            onClick={(event) => handleTagRemove(option, event)}
          >
            <span>{option.label}</span>
            <div className="multi-select-dropdown__tag-button">x</div>
          </button>
        ))}

        {value.length === 0 && !isDropdownOpen && (
          <span className="multi-select-dropdown__placeholder">
            {placeholder}
          </span>
        )}
      </div>
      {isDropdownOpen && (
        <div className="multi-select-dropdown__list-container">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`multi-select-dropdown__list-item ${
                value.some((selected) => selected.value === option.value) &&
                'multi-select-dropdown__list-item__selected'
              }`}
              onClick={(event) => handleOptionToggle(option, event)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
