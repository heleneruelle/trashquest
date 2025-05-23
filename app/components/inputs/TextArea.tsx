interface TextAreaProps {
  id: string;
  name: string;
  maxlength?: number;
  label: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  defaultValue?: string;
}

function TextArea({
  id,
  name,
  maxlength = 3000,
  label,
  placeholder,
  required = true,
  hint,
  defaultValue,
}: TextAreaProps) {
  return (
    <label htmlFor={id} className="labelled-input text-input">
      {label}
      <textarea
        id={id}
        name={name}
        maxLength={maxlength}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {hint && <small className="input-hint">{hint}</small>}
    </label>
  );
}

export default TextArea;
