interface TextFieldProps {
  type: string;
  name: string;
  required?: boolean;
  label: string;
  placeholder?: string | undefined;
  error?: boolean;
  hint?: string | undefined;
  autoComplete?: 'off' | 'on';
}

function TextField({
  type,
  name,
  required = true,
  label,
  placeholder,
  error = false,
  hint,
}: TextFieldProps) {
  return (
    <label
      className={`labelled-input text-input ${error && 'text-input_error'}`}
      htmlFor={name}
    >
      {label}
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
      />
      {hint && <small className="input-hint">{hint}</small>}
    </label>
  );
}

export default TextField;
