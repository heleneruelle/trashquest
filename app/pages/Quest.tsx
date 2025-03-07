import { useLoaderData, useParams, useFetcher, Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import QuestType from '~/types/quest';
import Field from '~/components/display/Field';
import FieldWithChild from '~/components/display/FieldWithChild';
import EquipmentPillTag from '~/components/display/EquipmentPillTag';
import AccessibilityPillTag from '~/components/display/AccessibilityPillTag';
import EnvironmentPillTag from '~/components/display/EnvironmentPillTag copy';
import Button from '~/components/inputs/Button';
import QuestButton from '~/components/inputs/QuestButton';
import Toast from '~/components/notifications/Toast';
import QuestLocation from '~/components/display/quest/QuestLocation';
import { FaDragon } from 'react-icons/fa';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import asyncJoinQuest from '~/utils/quests/asyncJoinQuest';
import asyncQuitQuest from '~/utils/quests/asyncQuitQuest';
import i18n from '~/i18n';

interface LoaderData {
  success: boolean;
  quest: QuestType;
}

function Quest() {
  const data = useLoaderData<LoaderData>();
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  if (!data?.success || !data?.quest) {
    /* TODO error handling */
    return <div>{t('quest.error.title')}</div>;
  }

  const { id } = useParams();
  const questFetcher = useFetcher();

  const { quest } = data || {};
  const { properties, creator } = quest || {};

  const { isCurrentUserRegisteredForQuest, isCurrentUserCreator, isQuestFull } =
    properties;

  async function handleJoinQuest(e: Event) {
    e.preventDefault();
    try {
      const data = await asyncJoinQuest({ id });
      questFetcher.load('/api/quest');
      if (data.error) {
        setError(true);
        return;
      }
    } catch (error) {
      setError(true);
    }
  }

  async function handleQuitQuest(e: Event) {
    e.preventDefault();
    try {
      const data = await asyncQuitQuest({ id });
      questFetcher.load('/api/quest');

      if (data.error) {
        setError(true);
        return;
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="quests-container">
      {error && (
        <Toast
          type="error"
          message={t('quest.error.join')}
          callback={() => setError(false)}
        />
      )}
      {isCurrentUserRegisteredForQuest && (
        <div className="quest-registered">
          <p>{t('quest.joined')}</p>
          <FaDragon />
        </div>
      )}
      <h1>{properties.name}</h1>
      <p>{properties.description}</p>
      <FieldWithChild fieldName={t('quest.location')}>
        <QuestLocation quest={quest} />
      </FieldWithChild>
      <Field fieldName={t('quest.organiser')} fieldValue={creator.username} />
      <Field
        fieldName={t('quest.duration')}
        fieldValue={JSON.stringify(properties.duration)}
      />
      <Field
        fieldName={t('quest.participants')}
        fieldValue={`${properties.participants.length} / ${properties.expectedParticipants}`}
      />
      <FieldWithChild fieldName={t('quest.equipment')} id="equipment">
        <EquipmentPillTag equipment={properties.equipment} />
      </FieldWithChild>
      <FieldWithChild fieldName={t('quest.environment')} id="environment">
        <EnvironmentPillTag environment={properties.environment} />
      </FieldWithChild>
      <FieldWithChild fieldName={t('quest.accessibility')} id="accessibility">
        <AccessibilityPillTag accessibility={properties.accessibility} />
      </FieldWithChild>
      {!isCurrentUserCreator &&
        !isQuestFull &&
        !isCurrentUserRegisteredForQuest && (
          <Button
            type="button"
            label={t('quest.cta.join')}
            clickCallback={handleJoinQuest}
          />
        )}
      {!isCurrentUserCreator && isCurrentUserRegisteredForQuest && (
        <Button
          type="button"
          label={t('quest.cta.quit')}
          clickCallback={handleQuitQuest}
        />
      )}
      <Link to={createCompositeUrl(i18n, '/create-new')}>
        <QuestButton type="new" />
      </Link>
    </div>
  );
}

export default Quest;
