interface DatePickerProps {
  id: string;
  name: string;
  defaultValue?: string;
  min?: string;
  max?: string;
  required?: boolean;
}

function DatePicker({
  id,
  name,
  defaultValue,
  min,
  max,
  required = true,
}: DatePickerProps) {
  return (
    <div className="date-time-picker">
      <label htmlFor={id}>{name}</label>
      <input
        type="date"
        className="date-time-picker--input"
        id={id}
        name={name}
        defaultValue={defaultValue}
        min={min}
        max={max}
        required={required}
      />
    </div>
  );
}

export default DatePicker;
