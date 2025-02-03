import { useLoaderData } from '@remix-run/react';
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';
import ImageLayout from '~/components/templates/ImageLayout';
import Field from '~/components/display/Field';
import Button from '~/components/inputs/Button';

interface LoaderData {
  success: boolean;
  quest: {
    properties: {
      name: string;
      description: string;
      participants: number;
      expectedParticipants: string;
      equipment: string;
      environment: string;
      accessibility: string;
    };
    location: {
      name: string;
    };
    isCurrentUserCreator: boolean;
    creator: {
      username: string;
    };
  };
}

function Quest() {
  const data = useLoaderData<LoaderData>();

  if (data?.success && data?.quest) {
    const { quest } = data || {};
    const { properties, location, creator, isCurrentUserCreator } = quest || {};

    return (
      <TwoColumnsLayout>
        <div>
          <h1>{properties.name}</h1>
          <p>{properties.description}</p>
          <Field fieldName="location" fieldValue={location.name} />
          <Field fieldName="organiser" fieldValue={creator.username} />
          <Field
            fieldName="participants"
            fieldValue={`${properties.participants} / ${properties.expectedParticipants}`}
          />
          <Field fieldName="equipment" fieldValue={properties.equipment} />
          <Field fieldName="environment" fieldValue={properties.environment} />
          <Field
            fieldName="accessibility"
            fieldValue={properties.accessibility}
          />
          {!isCurrentUserCreator && (
            <Button label="join this quest" disabled={true} type="button" />
          )}
        </div>
        <ImageLayout />
      </TwoColumnsLayout>
    );
  }

  return <div>NO SUCH QUEST</div>;
}

export default Quest;
