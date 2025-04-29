import { LinksFunction } from '@remix-run/node';
//import User from '~/pages/User';
import userLoader from '~/loaders/user';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/quests.css' },
  ];
};

export const loader = userLoader;

function Temp() {
  return <div>This is a temp page for edit user information</div>;
}

export default Temp;
