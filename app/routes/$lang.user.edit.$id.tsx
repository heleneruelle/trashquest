import { LinksFunction } from '@remix-run/node';
import EditUserProfile from '~/pages/EditUserProfile';
import userLoader from '~/loaders/user';
import Auth from '~/components/error/Auth';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/editUserProfile.css' },
  ];
};

export function ErrorBoundary() {
  return <Auth />;
}

export const loader = userLoader;

export default EditUserProfile;
