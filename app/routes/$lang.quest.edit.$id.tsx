import { LinksFunction } from '@remix-run/node';
import EditQuest from '~/pages/EditQuest';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/quests.css' },
  ];
};

export default EditQuest;
