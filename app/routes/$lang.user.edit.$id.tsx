import { LinksFunction } from '@remix-run/node';
import EditUserProfile from '~/pages/EditUserProfile';
import userLoader from '~/loaders/user';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/editUserProfile.css' },
  ];
};

export function ErrorBoundary() {
  return <div>Sorry it seems there is an error, maybe log out and then in</div>;
}

export const loader = userLoader;

export default EditUserProfile;
