import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitch';
import LogoutButton from '../LogoutButton';
import useAuth from '~/hooks/useAuth';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

function TopBar() {
  const { user } = useAuth();
  const { t } = useTranslation();
  return (
    <div className="top-bar">
      <div className="top-bar__nav">
        {user && (
          <Link to={createCompositeUrl(i18n, '/')}>{t('meta.home')}</Link>
        )}
        {user && (
          <Link to={createCompositeUrl(i18n, '/my-quests')}>
            {t('meta.my-quests')}
          </Link>
        )}
        {user && (
          <Link to={createCompositeUrl(i18n, '/create-new')}>
            {t('meta.create-new')}
          </Link>
        )}
        <Link to={createCompositeUrl(i18n, '/about')}>{t('meta.about')}</Link>
      </div>
      <div className="top-bar__utils">
        <LanguageSwitcher />
        {user && <LogoutButton />}
      </div>
    </div>
  );
}

export default TopBar;
