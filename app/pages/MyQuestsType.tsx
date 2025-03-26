import { useLoaderData } from '@remix-run/react';
import { useParams } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import QuestListItem from '~/components/display/QuestListItem';
import QuestType from '~/types/quest';
import { HOST, PARTICIPANT, PAST } from '~/config';

interface LoaderData {
  success: boolean;
  quests: Array<QuestType>;
  questsAsParticipant: Array<QuestType>;
}

function getQuestPool(type, hostQuests = [], participantQuests = []) {
  if (type === PAST) {
    return [...(hostQuests || []), ...(participantQuests || [])].filter((q) => {
      const date = new Date(q.properties.endDateTime);
      const now = new Date();
      return date < now;
    });
  } else if (type === HOST && hostQuests?.length) {
    return hostQuests.filter((q) => {
      const date = new Date(q.properties.endDateTime);
      const now = new Date();
      return date > now;
    });
  } else if (type === PARTICIPANT && participantQuests?.length) {
    return participantQuests.filter((q) => {
      const date = new Date(q.properties.endDateTime);
      const now = new Date();
      return date > now;
    });
  } else return [];
}

function MyQuestsType() {
  const { type } = useParams();
  const { t } = useTranslation();
  const { quests, questsAsParticipant } = useLoaderData<LoaderData>();

  const data = getQuestPool(type, quests, questsAsParticipant);

  return (
    <div className="my-quests-container">
      <h3>{t(`my-quests.${type}.title`)}</h3>
      {data?.length ? (
        <ul className="quests-ul">
          {data.map((d) => (
            <li key={d.id}>
              <QuestListItem quest={d} />
            </li>
          ))}
        </ul>
      ) : (
        <div>{t(`my-quests.${type}.none`)}</div>
      )}
    </div>
  );
}

export default MyQuestsType;
