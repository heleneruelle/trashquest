import { useParams } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import ButtonLink from '~/components/inputs/ButtonLink';
import EditQuestForm from '~/components/forms/EditQuestForm';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import QuestType from '~/types/quest';

interface LoaderData {
  success: boolean;
  quest: QuestType;
}

function EditQuest() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { quest } = useLoaderData<LoaderData>();

  return (
    <div className="quests-container">
      <h1>{t('quest.edit.title')}</h1>
      <EditQuestForm quest={quest} />
      <ButtonLink target={createCompositeUrl(i18n, `quest/${id}`)}>
        {t('quit')}
      </ButtonLink>
    </div>
  );
}

export default EditQuest;
