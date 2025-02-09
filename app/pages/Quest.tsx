import { useLoaderData, useParams, useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';
import ImageLayout from '~/components/templates/ImageLayout';
import Field from '~/components/display/Field';
import Button from '~/components/inputs/Button';
import FieldWithTag from '~/components/display/FieldWithTag';
import ButtonLink from '~/components/inputs/ButtonLink';
import Toast from '~/components/notifications/Toast';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import useAuth from '~/hooks/useAuth';

interface LoaderData {
  success: boolean;
  quest: {
    properties: {
      name: string;
      description: string;
      participants: Array<string>;
      expectedParticipants: string;
      equipment: Array<string>;
      environment: Array<string>;
      accessibility: Array<string>;
      duration: {
        hours?: number;
        days?: number;
        minutes?: number;
      };
      isQuestFull: boolean;
    };
    location: {
      name: string;
    };
    creator: {
      username: string;
      uid: string;
    };
  };
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
  const { user } = useAuth();
  const questFetcher = useFetcher();

  const { quest } = data || {};
  const { properties, location, creator } = quest || {};

  const isCurrentUserCreator = user?.uid === creator.uid;

  const isCurrentUserQuestRegistered = properties.participants.includes(
    user?.uid
  );

  async function handleJoinQuest(e: Event) {
    e.preventDefault();
    try {
      const response = await fetch('/api/join-quest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();
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
      const response = await fetch('/api/quit-quest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();
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
    <TwoColumnsLayout>
      <div>
        {error && (
          <Toast
            type="error"
            message={t('quest.error.join')}
            callback={() => setError(false)}
          />
        )}
        {isCurrentUserQuestRegistered && (
          <div className="quest-registered">
            <p>{t('quest.joined')}</p>
          </div>
        )}
        <h1>{properties.name}</h1>
        <p>{properties.description}</p>
        <Field fieldName={t('quest.location')} fieldValue={location.name} />
        <Field fieldName={t('quest.organiser')} fieldValue={creator.username} />
        <Field
          fieldName={t('quest.duration')}
          fieldValue={JSON.stringify(properties.duration)}
        />
        <Field
          fieldName={t('quest.participants')}
          fieldValue={`${properties.participants.length} / ${properties.expectedParticipants}`}
        />
        <FieldWithTag
          fieldName={t('quest.equipment')}
          fieldValues={properties.equipment}
        />
        <FieldWithTag
          fieldName={t('quest.environment')}
          fieldValues={properties.environment}
        />
        <FieldWithTag
          fieldName={t('quest.accessibility')}
          fieldValues={properties.accessibility}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {!isCurrentUserCreator &&
            !properties.isQuestFull &&
            !isCurrentUserQuestRegistered && (
              <Button
                type="button"
                label={t('quest.cta.join')}
                clickCallback={handleJoinQuest}
              />
            )}
          {!isCurrentUserCreator && isCurrentUserQuestRegistered && (
            <Button
              type="button"
              label={t('quest.cta.quit')}
              clickCallback={handleQuitQuest}
            />
          )}
          <ButtonLink label="Go Home" target={createCompositeUrl(i18n, '/')} />
          <ButtonLink
            label={t('create-new-quest.cta.new')}
            target={createCompositeUrl(i18n, '/create-new')}
          />
        </div>
      </div>
      <ImageLayout />
    </TwoColumnsLayout>
  );
}

export default Quest;
