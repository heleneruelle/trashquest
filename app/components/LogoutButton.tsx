import { useNavigate } from '@remix-run/react';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import { auth } from '~/firebaseConfig';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      await auth.signOut();
      return navigate(createCompositeUrl(i18n, '/login'));
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
