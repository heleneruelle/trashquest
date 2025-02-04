import { useLoaderData } from '@remix-run/react';
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';
import ImageLayout from '~/components/templates/ImageLayout';
import Field from '~/components/display/Field';
import FieldWithTag from '~/components/display/FieldWithTag';
import ButtonLink from '~/components/inputs/ButtonLink';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import { auth } from '~/firebaseConfig';
import { useTranslation } from 'react-i18next';

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
    creator: {
      username: string;
      uid: string;
    };
  };
}

function Quest() {
  const data = useLoaderData<LoaderData>();
 // const { t } = useTranslation();

  //console.log('LALALALAL', data)

  if (data?.success && data?.quest) {
    const { quest } = data || {};
    const { properties, location, creator } = quest || {};
    const isCurrentUserCreator = auth.currentUser?.uid === creator.uid;

    return (
      <TwoColumnsLayout>
        <div>
          <h1>{properties.name}</h1>
          <p>{properties.description}</p>
          <Field fieldName="location" fieldValue={location.name} />
          <Field fieldName="organiser" fieldValue={creator.username} />
   {/*        <Field
            fieldName="duration"
            fieldValue={t('duration', {postProcess: 'interval', count: 1})}
          /> */}
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
          {/* TODO handle join quest action */}
          {!isCurrentUserCreator && (
            <button disabled={true} type="button">
              {'join this quest'}
            </button>
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
