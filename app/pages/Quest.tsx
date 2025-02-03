import { useLoaderData } from '@remix-run/react';
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';
import ImageLayout from '~/components/templates/ImageLayout';
import Field from '~/components/display/Field';
import Button from '~/components/inputs/Button';
import FieldWithTag from '~/components/display/FieldWithTag';
import ButtonLink from '~/components/inputs/ButtonLink';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

interface LoaderData {
  success: boolean;
  quest: {
    properties: {
      name: string;
      description: string;
      participants: number;
      expectedParticipants: string;
      equipment: Array<string>;
      environment: Array<string>;
      accessibility: Array<string>;
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
          {!isCurrentUserCreator && (
            <Button label="join this quest" disabled={true} type="button" />
          )}
          <ButtonLink label="Go Home" target={createCompositeUrl(i18n, '/')} />
          <ButtonLink
            label="Create new quest"
            target={createCompositeUrl(i18n, '/create-new')}
          />
        </div>
        <ImageLayout />
      </TwoColumnsLayout>
    );
  }

  return <div>NO SUCH QUEST</div>;
}

export default Quest;
