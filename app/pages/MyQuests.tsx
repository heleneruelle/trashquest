import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import QuestListItem from '~/components/display/QuestListItem';
import QuestType from '~/types/quest';

interface LoaderData {
  success: boolean;
  quests: Array<QuestType>;
}

function MyQuests() {
  const { success, quests } = useLoaderData<LoaderData>();
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('my-quests.title')}</h1>
      <ul>
        {success && quests?.length
          ? quests.map((quest) => (
              <li key={quest.id}>
                <QuestListItem quest={quest} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default MyQuests;
