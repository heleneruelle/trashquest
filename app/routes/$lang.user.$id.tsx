import { LinksFunction } from '@remix-run/node';
import User from '~/pages/User';
import userLoader from '~/loaders/user';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/quests.css' },
    { rel: 'stylesheet', href: '/styles/user.css' },
  ];
};

export const loader = userLoader;

export default User;
