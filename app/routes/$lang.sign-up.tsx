import { LinksFunction } from '@remix-run/node';
import SignUpPage from '~/pages/SignUp';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/signup.css' },
  ];
};

export default SignUpPage;
