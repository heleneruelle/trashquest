import { useLoaderData, useParams, useFetcher } from '@remix-run/react';
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

  if (!data?.success || !data?.quest) {
    return <div>NO SUCH QUEST</div>;
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
      if (!user) {
        setError(true);
      }
      const idToken = await user.getIdToken();
      const response = await fetch('/api/join-quest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
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
      if (!user) {
        setError(true);
      }
      const idToken = await user.getIdToken();
      const response = await fetch('/api/quit-quest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
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
            message={'Join quest failed'}
            callback={() => setError(false)}
          />
        )}
        {isCurrentUserQuestRegistered && (
          <div className="quest-registered">
            <p>Vous êtes inscrit.e pour cette quête</p>
          </div>
        )}
        <h1>{properties.name}</h1>
        <p>{properties.description}</p>
        <Field fieldName="location" fieldValue={location.name} />
        <Field fieldName="organiser" fieldValue={creator.username} />
        <Field
          fieldName="duration"
          fieldValue={JSON.stringify(properties.duration)}
        />
        <Field
          fieldName="participants"
          fieldValue={`${properties.participants.length} / ${properties.expectedParticipants}`}
        />
        <FieldWithTag
          fieldName="equipment"
          fieldValues={properties.equipment}
        />
        <FieldWithTag
          fieldName="environment"
          fieldValues={properties.environment}
        />
        <FieldWithTag
          fieldName="accessibility"
          fieldValues={properties.accessibility}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {!isCurrentUserCreator &&
            !properties.isQuestFull &&
            !isCurrentUserQuestRegistered && (
              <Button
                type="button"
                label="Join this quest"
                clickCallback={handleJoinQuest}
              />
            )}
          {!isCurrentUserCreator && isCurrentUserQuestRegistered && (
            <Button
              type="button"
              label="Quit this quest"
              clickCallback={handleQuitQuest}
            />
          )}
          <ButtonLink label="Go Home" target={createCompositeUrl(i18n, '/')} />
          <ButtonLink
            label="Create new quest"
            target={createCompositeUrl(i18n, '/create-new')}
          />
        </div>
      </div>
      <ImageLayout />
    </TwoColumnsLayout>
  );
}

export default Quest;
