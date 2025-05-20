import { LinksFunction } from '@remix-run/node';
import EditQuest from '~/pages/EditQuest';
import questLoader from '~/loaders/quest';

export const loader = questLoader;

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/quests.css' },
  ];
};

export default EditQuest;
