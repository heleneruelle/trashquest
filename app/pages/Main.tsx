import { useTranslation } from 'react-i18next';
import { useLoaderData } from '@remix-run/react';
import ButtonLink from '~/components/inputs/ButtonLink';
import QuestListItem from '~/components/display/QuestListItem';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import QuestType from '~/types/quest';

interface LoaderData {
  success: boolean;
  quests: Array<QuestType>;
}

function Main() {
  const { t } = useTranslation();
  const { success, quests } = useLoaderData<LoaderData>();

  return (
    <div className="welcome__container--wip">
      <h1>{t('welcome')}</h1>
      <p className="welcome__description">{t('description')}</p>
      <ul>
        {success && quests?.length
          ? quests.map((quest) => (
              <li key={quest.id}>
                <QuestListItem quest={quest} />
              </li>
            ))
          : null}
      </ul>
      <ButtonLink
        label="Create new quest"
        target={createCompositeUrl(i18n, '/create-new')}
      />
    </div>
  );
}

export default Main;
