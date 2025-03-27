import { useLoaderData } from '@remix-run/react';
import { useParams } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import QuestListItem from '~/components/display/QuestListItem';
import QuestType from '~/types/quest';

interface LoaderData {
  success: boolean;
  data: Array<QuestType>;
}

function MyQuestsType() {
  const { type } = useParams();
  const { t } = useTranslation();
  const { data } = useLoaderData<LoaderData>();

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
