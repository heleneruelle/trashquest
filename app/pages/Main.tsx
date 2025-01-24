import { useTranslation } from 'react-i18next';
import Button from '~/components/inputs/Button';
import ButtonLink from '~/components/inputs/ButtonLink';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import useAuth from '~/hooks/useAuth';

function Main() {
  const { t } = useTranslation();

  const { user, loading } = useAuth;

  console.log('AUTH loading', loading);
  console.log('AUTH user', user);

  return (
    <div className="welcome__container--wip">
      <h1>{t('welcome')}</h1>
      <p className="welcome__description">{t('description')}</p>
      <ButtonLink
        label="Create new quest"
        target={createCompositeUrl(i18n, '/create-new')}
      />
    </div>
  );
}

export default Main;
