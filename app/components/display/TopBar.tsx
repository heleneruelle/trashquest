import { Link, NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import LanguageSwitcher from '../LanguageSwitch';
import LogoutButton from '../LogoutButton';
import { TbCircleLetterTFilled } from 'react-icons/tb';
import { IoMenu } from 'react-icons/io5';
import AuthenticatedNav from './AuthenticatedNav';
import useAuth from '~/hooks/useAuth';
import useIsMobile from '~/hooks/useIsMobile';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

function TopBar() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="top-bar">
      <Link
        className="top-bar__home"
        to={createCompositeUrl(i18n, user ? '/home' : '/')}
      >
        <TbCircleLetterTFilled size={30} />
        {isMobile ? null : <span>Trashquest</span>}
      </Link>
      <div className="top-bar__right">
        {isMobile ? null : (
          <div className="top-bar__nav">
            {user ? <AuthenticatedNav user={user} /> : null}
            <NavLink to={createCompositeUrl(i18n, '/about')}>
              {t('meta.about')}
            </NavLink>
          </div>
        )}
        <div className="top-bar__utils">
          <LanguageSwitcher />
          {user && <LogoutButton />}
        </div>
        {isMobile ? (
          <button
            className="top-bar__floating-menu__trigger"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <IoMenu size={24} />
          </button>
        ) : null}
      </div>
      {openMenu ? (
        <div className="top-bar__floating-menu">
          {user ? <AuthenticatedNav user={user} /> : null}
          <NavLink to={createCompositeUrl(i18n, '/about')}>
            {t('meta.about')}
          </NavLink>
        </div>
      ) : null}
    </div>
  );
}

export default TopBar;
