import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import UserType from '~/types/user';
import QuestType from '~/types/quest';
import QuestListItem from '~/components/display/QuestListItem';

interface LoaderData {
  success: boolean;
  user: UserType;
  quests: Array<QuestType>;
}

function User() {
  const { user, quests } = useLoaderData<LoaderData>();
  const { t } = useTranslation();

  const { country, username } = user || {};

  return (
    <div className="quests-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>{username}</h1>
        <img
          src="/assets/default-avatar.webp"
          style={{ height: '75px', width: '75px' }}
        />
      </div>
      <p>{t(`countries.${country}`)}</p>
      <div>
        {quests?.length ? (
          <div>
            <h4>{`Les quêtes organisées par ${username}`}</h4>
            <ul className="quests-ul">
              {quests.map((quest) => (
                <li key={quest.id}>
                  <QuestListItem quest={quest} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h4>{`${username} n'organise pas de quête pour le moment`}</h4>
        )}
      </div>
    </div>
  );
}

export default User;
