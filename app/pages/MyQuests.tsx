import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import QuestListItem from '~/components/display/QuestListItem';
import QuestType from '~/types/quest';

interface LoaderData {
  success: boolean;
  quests: Array<QuestType>;
  questsAsParticipant: Array<QuestType>;
}

function MyQuests() {
  const { quests, questsAsParticipant } = useLoaderData<LoaderData>();

  const { t } = useTranslation();

  return (
    <div className="quests-container">
      <h1>{t('my-quests.title')}</h1>
      <h3>{t('my-quests.organiser.title')}</h3>
      {quests?.length ? (
        <ul>
          {quests.map((quest) => (
            <li key={quest.id}>
              <QuestListItem quest={quest} />
            </li>
          ))}
        </ul>
      ) : (
        <div>{t('my-quests.organiser.none')}</div>
      )}
      <h3>{t('my-quests.participant.title')}</h3>
      {questsAsParticipant?.length ? (
        <ul>
          {questsAsParticipant.map((quest) => (
            <li key={quest.id}>
              <QuestListItem quest={quest} />
            </li>
          ))}
        </ul>
      ) : (
        <div>{t('my-quests.participant.none')}</div>
      )}
    </div>
  );
}

export default MyQuests;
