import { useTranslation } from 'react-i18next';
import { useLoaderData } from '@remix-run/react';
import ButtonLink from '~/components/inputs/ButtonLink';
import QuestListItem from '~/components/display/QuestListItem';
import QuestsFilters from '~/components/forms/QuestsFilters';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import QuestType from '~/types/quest';
import UserType from '~/types/user';

interface LoaderData {
  success: boolean;
  quests: Array<QuestType>;
  user: UserType;
  rawData: Array<QuestType>;
}

function Main() {
  const { t } = useTranslation();
  const { quests, user, rawData } = useLoaderData<LoaderData>();

  const hasNoQuest = !rawData?.length;
  const hasNoQuestForFilters = rawData?.length && !quests?.length;

  const { username } = user || {};

  return (
    <div className="welcome__container--wip">
      <h1>{t('welcome', { name: username })}</h1>
      <QuestsFilters />
      {hasNoQuest && <p>{t('quests.no-quest')}</p>}
      {hasNoQuestForFilters && <p>{t('quests.no-quest-filters')}</p>}
      <ul>
        {quests?.length
          ? quests.map((quest) => (
              <li key={quest.id}>
                <QuestListItem quest={quest} />
              </li>
            ))
          : null}
      </ul>
      <ButtonLink
        label={t('create-new-quest.cta.new')}
        target={createCompositeUrl(i18n, '/create-new')}
      />
    </div>
  );
}

export default Main;
