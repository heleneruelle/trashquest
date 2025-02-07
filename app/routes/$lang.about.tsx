import { LinksFunction } from '@remix-run/node';
import About from '~/pages/About';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: '/styles/about.css' }];
};

export default About;
