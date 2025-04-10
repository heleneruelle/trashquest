import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import UserType from '~/types/user';
import QuestType from '~/types/quest';
import QuestListItem from '~/components/display/QuestListItem';

interface LoaderData {
  success: boolean;
  user: UserType;
  quests: Array<QuestType>;
  isCurrentUserProfile: boolean;
}

function User() {
  const { user, quests, isCurrentUserProfile } = useLoaderData<LoaderData>();
  const { t } = useTranslation();

  const { country, location, username } = user || {};

  return (
    <div className="quests-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>{username}</h1>
        <img
          src="/assets/default-avatar.webp"
          style={{ height: '75px', width: '75px' }}
        />
      </div>
      <p>{location?.name}</p>
      <p>{t(`countries.${country}`)}</p>
      <div>
        {quests?.length ? (
          <div className="quest-list-container">
            <h4>
              {t(
                isCurrentUserProfile
                  ? 'user.my-profile.organised'
                  : 'user.profile.organised',
                { username }
              )}
            </h4>
            <ul className="quests-ul">
              {quests.map((quest) => (
                <li key={quest.id}>
                  <QuestListItem quest={quest} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h4>
            {t(
              isCurrentUserProfile
                ? 'user.my-profile.no-quest'
                : 'user.profile.no-quest',
              { username }
            )}
          </h4>
        )}
      </div>
    </div>
  );
}

export default User;
