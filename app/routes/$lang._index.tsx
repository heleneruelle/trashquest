import { LinksFunction } from '@remix-run/node';
import Welcome from '~/pages/Welcome';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/welcome.css' },
  ];
};

export default Welcome;
