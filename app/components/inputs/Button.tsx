interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  label: string;
  style?: 'primary' | 'secondary' | 'tertiary';
  clickCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  type,
  disabled = false,
  label,
  style = 'primary',
  clickCallback,
}: ButtonProps) {
  return (
    <button
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
