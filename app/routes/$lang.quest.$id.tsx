import { LinksFunction } from '@remix-run/node';
import Quest from '~/pages/Quest';
import questLoader from '~/loaders/quest';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/quests.css' },
  ];
};

export const loader = questLoader;

export default Quest;
