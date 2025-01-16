interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  disabled: boolean;
  label: string;
  style: 'primary' | 'secondary' | 'tertiary';
}

function Button({
  type,
  disabled = false,
  label,
  style = 'primary',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button button-${style}`}
    >
      {label}
    </button>
  );
}

export default Button;
