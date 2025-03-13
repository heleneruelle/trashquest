import { useTranslation } from 'react-i18next';
import { useLoaderData, Link } from '@remix-run/react';
import QuestButton from '~/components/inputs/QuestButton';
import QuestListItem from '~/components/display/QuestListItem';
import QuestsFilters from '~/components/forms/QuestsFilters';
import TagTitle from '~/components/display/TagTitle';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import QuestType from '~/types/quest';
import UserType from '~/types/user';

interface LoaderData {
  success: boolean;
  quests: Array<QuestType>;
  user: UserType;
  rawData: Array<QuestType>;
  closestQuest: QuestType;
}

function Main() {
  const { t } = useTranslation();
  const { closestQuest, quests, user, rawData } = useLoaderData<LoaderData>();

  const hasNoQuest = !rawData?.length;
  const hasNoQuestForFilters =
    rawData?.length && !quests?.length && !closestQuest;

  const { username } = user || {};

  return (
    <div className="quests-container">
      <h1>{t('welcome', { name: username })}</h1>
      <QuestsFilters />
      {hasNoQuest ? <p>{t('quests.no-quest')}</p> : null}
      {hasNoQuestForFilters ? <p>{t('quests.no-quest-filters')}</p> : null}
      {quests?.length ? (
        <div className="quest-list-container">
          <h4>{t('quests.available')}</h4>
          <ul className="quests-ul">
            {closestQuest ? (
              <li key={closestQuest.id}>
                <QuestListItem quest={closestQuest} />
              </li>
            ) : null}
            {quests.map((quest) => (
              <li key={quest.id}>
                <QuestListItem quest={quest} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <Link to={createCompositeUrl(i18n, '/create-new')}>
        <QuestButton type="new" />
      </Link>
    </div>
  );
}

export default Main;
