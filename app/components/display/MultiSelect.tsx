import React, { useRef } from 'react';

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

  /* const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current && 
      !containerRef.current.contains(event.target as Node) && 
      !((event.target as HTMLElement)?.closest('.multi-select-dropdown'))
    ) {
      console.log('handleClickOutside');
      setIsDropdownOpen(false);
    }
  };  

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); */

  return (
    <div ref={containerRef} className="multi-select-dropdown">
      <div
        onClick={handleContainerClick}
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '8px',
          minHeight: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: '#f9f9f9',
          position: 'relative',
        }}
      >
        {value.map((option) => (
          <button
            type="button"
            key={option.value}
            className="multi-select-tag"
            onClick={(event) => handleTagRemove(option, event)}
            style={{
              backgroundColor: '#e0e0e0',
              borderRadius: '16px',
              margin: '2px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span>{option.label}</span>
            <div
              style={{
                marginLeft: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              x
            </div>
          </button>
        ))}

        {value.length === 0 && !isDropdownOpen && (
          <span style={{ color: '#aaa' }}>{placeholder}</span>
        )}
      </div>
      {isDropdownOpen && (
        <div
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            zIndex: 10,
          }}
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={(event) => handleOptionToggle(option, event)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: value.some(
                  (selected) => selected.value === option.value
                )
                  ? '#d3d3d3'
                  : 'white',
                width: '100%',
                textAlign: 'left',
                border: 'none',
              }}
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
