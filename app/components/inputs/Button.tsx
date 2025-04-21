interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  label?: React.ReactNode;
  style?: 'primary' | 'secondary' | 'tertiary';
  clickCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id: string;
  value?: string;
  children?: React.ReactNode;
}

function Button({
  type,
  disabled = false,
  label,
  style = 'primary',
  clickCallback,
  id,
  value,
  children,
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
      {label || children}
    </button>
  );
}

export default Button;
