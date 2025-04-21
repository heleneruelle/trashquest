import { Link } from '@remix-run/react';
import { Children } from 'react';

interface ButtonLinkProps {
  target: string;
  label?: React.ReactNode;
  style?: 'primary' | 'secondary' | 'tertiary';
  children?: React.ReactNode;
}

function ButtonLink({
  target,
  label,
  style = 'primary',
  children,
}: ButtonLinkProps) {
  return (
    <Link to={target} className={`button button-${style}`}>
      {label || children}
    </Link>
  );
}

export default ButtonLink;
