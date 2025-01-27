import { useNavigate } from '@remix-run/react';
import { auth } from '~/firebaseConfig';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate(createCompositeUrl(i18n, '/login'));
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
