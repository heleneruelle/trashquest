import { LinksFunction } from '@remix-run/node';
import Home from '~/pages/Home';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/home.css' },
  ];
};

export default Home;
