import { Link } from '@remix-run/react';

interface ButtonLinkProps {
  target: string;
  style?: 'primary' | 'secondary' | 'tertiary';
  children?: React.ReactNode;
}

function ButtonLink({ target, style = 'primary', children }: ButtonLinkProps) {
  return (
    <Link to={target} className={`button button-${style}`}>
      {children}
    </Link>
  );
}

export default ButtonLink;
