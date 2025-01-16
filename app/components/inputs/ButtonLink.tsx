import { Link } from '@remix-run/react';

interface ButtonLinkProps {
  target: string;
  label: string;
  style?: 'primary' | 'secondary' | 'tertiary';
}

function ButtonLink({ target, label, style = 'primary' }: ButtonLinkProps) {
  return (
    <Link to={target} className={`button button-${style}`}>
      {label}
    </Link>
  );
}

export default ButtonLink;
