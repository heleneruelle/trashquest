import { LinksFunction } from '@remix-run/node';
import Quest from '~/pages/Quest';
import questLoader from '~/loaders/quest';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: '/styles/form.css' }];
};

export const loader = questLoader;

export default Quest;
