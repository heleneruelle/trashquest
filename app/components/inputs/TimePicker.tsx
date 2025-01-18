import { useTranslation } from 'react-i18next';

interface TimePickerProps {
  id: string;
  name: string;
  defaultValue?: string;
  min?: string;
  max?: string;
  required?: boolean;
}

function TimePicker({
  id,
  name,
  defaultValue,
  min,
  max,
  required = true,
}: TimePickerProps) {
  const { t } = useTranslation();
  return (
    <div className="date-time-picker">
      <label htmlFor={id}>{t('time')}</label>
      <input
        type="time"
        className="date-time-picker--input"
        id={id}
        name={name}
        min={min}
        max={max}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default TimePicker;
