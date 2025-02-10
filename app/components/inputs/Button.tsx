interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  label: string;
  style?: 'primary' | 'secondary' | 'tertiary';
  clickCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
  value: string;
}

function Button({
  type,
  disabled = false,
  label,
  style = 'primary',
  clickCallback,
  id,
  value,
}: ButtonProps) {
  return (
    <button
      id={id}
      value={value}
      type={type}
      disabled={disabled}
      className={`button button-${style}`}
      onClick={type === 'button' && clickCallback ? clickCallback : undefined}
    >
      {label}
    </button>
  );
}

export default Button;
