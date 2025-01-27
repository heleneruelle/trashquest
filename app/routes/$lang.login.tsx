import { LinksFunction } from '@remix-run/node';
import LoginPage from '~/pages/Login';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/login.css' },
  ];
};

export default LoginPage;
