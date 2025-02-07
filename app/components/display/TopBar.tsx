import { Link } from '@remix-run/react';
import LanguageSwitcher from '../LanguageSwitch';
import LogoutButton from '../LogoutButton';
import useAuth from '~/hooks/useAuth';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

function TopBar() {
  const { user } = useAuth();

  return (
    <div className="top-bar">
      <div className="top-bar__nav">
        {user && <Link to={createCompositeUrl(i18n, '/')}>Home</Link>}
        <Link to={createCompositeUrl(i18n, '/about')}>About</Link>
        <Link to={createCompositeUrl(i18n, '/my-quests')}>My Quests</Link>
      </div>
      <div className="top-bar__utils">
        <LanguageSwitcher />
        {user && <LogoutButton />}
      </div>
    </div>
  );
}

export default TopBar;
