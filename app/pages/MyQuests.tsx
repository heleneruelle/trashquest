import { useTranslation } from 'react-i18next';
import { useParams } from '@remix-run/react';
import { Outlet, Link } from '@remix-run/react';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoPerson } from 'react-icons/io5';
import { RiArrowGoBackLine } from 'react-icons/ri';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import { HOST, PARTICIPANT, PAST } from '~/config';

function MyQuests() {
  const { t } = useTranslation();

  const { type } = useParams();

  return (
    <div className="quests-container">
      <h1>{t('my-quests.title')}</h1>
      <div className="my-quests-filters__container">
        <Link
          to={createCompositeUrl(i18n, '/my-quests/going')}
          className={`my-quests-filters ${type === PARTICIPANT && 'active'}`}
        >
          <FaCircleCheck />
          {t('my-quests.filters.going')}
        </Link>
        <Link
          to={createCompositeUrl(i18n, '/my-quests/host')}
          className={`my-quests-filters ${type === HOST && 'active'}`}
        >
          <IoPerson />
          {t('my-quests.filters.host')}
        </Link>
        <Link
          to={createCompositeUrl(i18n, '/my-quests/past')}
          className={`my-quests-filters ${type === PAST && 'active'}`}
        >
          <RiArrowGoBackLine />
          {t('my-quests.filters.past')}
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default MyQuests;
