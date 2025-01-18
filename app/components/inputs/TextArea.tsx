interface TextAreaProps {
  id: string;
  name: string;
  maxlength?: number;
  label: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

function TextArea({
  id,
  name,
  maxlength = 3000,
  label,
  placeholder,
  required = true,
  hint,
}: TextAreaProps) {
  return (
    <label htmlFor={id} className="text-input">
      {label}
      <textarea
        id={id}
        name={name}
        maxLength={maxlength}
        required={required}
        placeholder={placeholder}
      />
      {hint && <small className="input-hint">{hint}</small>}
    </label>
  );
}

export default TextArea;
