import { LinksFunction } from '@remix-run/node';
import LoginPage from '~/pages/Login';
import { loginAction } from '../loaders/login';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/login.css' },
  ];
};

export { loginAction as action };

export default LoginPage;
