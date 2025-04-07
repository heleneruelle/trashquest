import { Link, NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitch';
import LogoutButton from '../LogoutButton';
import { TbCircleLetterTFilled } from 'react-icons/tb';
import useAuth from '~/hooks/useAuth';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

function TopBar() {
  const { user } = useAuth();
  const { t } = useTranslation();
  return (
    <div className="top-bar">
      <Link
        className="top-bar__home"
        to={createCompositeUrl(i18n, user ? '/home' : '/')}
      >
        <TbCircleLetterTFilled size={30} />
        <span>Trashquest</span>
      </Link>
      <div className="top-bar__right">
        <div className="top-bar__nav">
          {user && (
            <NavLink to={createCompositeUrl(i18n, '/home')}>
              {t('meta.home')}
            </NavLink>
          )}
          {user && (
            <NavLink to={createCompositeUrl(i18n, '/my-quests/going')}>
              {t('meta.my-quests')}
            </NavLink>
          )}
          {user && (
            <NavLink to={createCompositeUrl(i18n, '/create-new')}>
              {t('meta.create-new')}
            </NavLink>
          )}
          <NavLink to={createCompositeUrl(i18n, '/about')}>
            {t('meta.about')}
          </NavLink>
        </div>
        <div className="top-bar__utils">
          <LanguageSwitcher />
          {user && <LogoutButton />}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
