import { NavLink } from '@remix-run/react';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import { useTranslation } from 'react-i18next';
import i18n from '~/i18n';

function AuthenticatedNav({ user }: { user: { uid: string } }) {
  const { t } = useTranslation();
  return (
    <>
      <NavLink to={createCompositeUrl(i18n, '/home')}>{t('meta.home')}</NavLink>
      <NavLink to={createCompositeUrl(i18n, '/my-quests/going')}>
        {t('meta.my-quests')}
      </NavLink>
      <NavLink to={createCompositeUrl(i18n, '/create-new')}>
        {t('meta.create-new')}
      </NavLink>
      <NavLink to={createCompositeUrl(i18n, `/user/${user.uid}`)}>
        {t('meta.my-profile')}
      </NavLink>
    </>
  );
}

export default AuthenticatedNav;
