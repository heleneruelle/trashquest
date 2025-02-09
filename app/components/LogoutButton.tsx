import { useFetcher } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import { auth } from '~/firebaseConfig';

const LogoutButton = () => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleLogout = async () => {
    try {
      await fetcher.submit({}, { method: 'post', action: '/logout' });
      await auth.signOut();
      return navigate(createCompositeUrl(i18n, '/login'));
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
