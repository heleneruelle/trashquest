import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';
import { useRef, useState } from 'react';
import TextField from '../inputs/TextField';
import LocationAutoComplete from '../inputs/LocationAutocomplete';
import DatePicker from '../inputs/DatePicker';
import TimePicker from '../inputs/TimePicker';
import Counter from '../inputs/Counter';
import MultiSelectInput from '../display/MultiSelectInput';
import TextArea from '../inputs/TextArea';
import Toast from '../notifications/Toast';
import QuestButton from '../inputs/QuestButton';
import dateToYYYYMMDD from '~/utils/datetime/dateToYYYYMMDD';
import timeToHHMM from '~/utils/datetime/timeToHHMM';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import {
  environmentOptions,
  accessibilityOptions,
  equipmentOptions,
} from '~/config';
import i18n from '~/i18n';
import QuestType from '~/types/quest';

function EditQuestForm({ quest }: { quest: QuestType }) {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { properties, location } = quest;
  const {
    name: questName,
    startDateTime,
    endDateTime,
    description,
    expectedParticipants,
  } = properties;
  const { id, name: locationName, coordinates, country } = location;

  /* const handleCreateQuest = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch('/api/create-quest', {
        method: 'POST',
        body: formData,
      });
      const resp = await response.json();
      if (resp.error || !resp.questId) {
        return setError(resp.error);
      } else if (resp.questId) {
        return navigate(createCompositeUrl(i18n, `/quest/${resp.questId}`));
      }
    } catch (error) {
      return setError(`Error creating quest: ${error}`);
    }
  }; */

  return (
    <Form
      method="post"
      encType="multipart/form-data"
      ref={formRef}
      className="form"
      // onSubmit={handleCreateQuest}
    >
      {error && (
        <Toast
          type="error"
          message={t('create-new-quest.error')}
          callback={() => setError('')}
        />
      )}
      <TextField
        type="text"
        name="name"
        label={t('create-new-quest.input.name')}
        defaultValue={questName}
      />
      <LocationAutoComplete
        hint={t('create-new-quest.hint.location')}
        types={['address', 'place']}
        poi={true}
        defaultLocation={{
          id: id,
          properties: {
            name: locationName,
            full_address: locationName,
            coordinates: {
              latitude: coordinates._latitude,
              longitude: coordinates._longitude,
            },
          },
        }}
        defaultCountry={country}
      />
      {/*       <label htmlFor="banner" className="labelled-input">
        {t('create-new-quest.input.banner')}
        <input
          type="file"
          id="banner"
          name="banner"
          accept="image/png, image/jpeg"
        />
      </label> */}
      <fieldset>
        <legend className="date-time">
          {t('create-new-quest.input.start')}
        </legend>
        <div className="date-time-picker-container">
          <DatePicker
            id="startDate"
            name="startDate"
            defaultValue={dateToYYYYMMDD(new Date(startDateTime))}
            min={dateToYYYYMMDD(new Date())}
          />
          <TimePicker
            id="startTime"
            name="startTime"
            defaultValue={timeToHHMM(new Date(startDateTime))}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="date-time">{t('create-new-quest.input.end')}</legend>
        <div className="date-time-picker-container">
          <DatePicker
            id="endDate"
            name="endDate"
            defaultValue={dateToYYYYMMDD(new Date(endDateTime))}
            min={dateToYYYYMMDD(new Date())}
          />
          <TimePicker
            id="endTime"
            name="endTime"
            defaultValue={timeToHHMM(new Date(endDateTime))}
          />
        </div>
      </fieldset>
      <TextArea
        id="description"
        name="description"
        label={t('create-new-quest.input.description')}
        hint={t('create-new-quest.hint.description')}
        defaultValue={description}
      />
      <Counter
        id="expectedParticipants"
        name="expectedParticipants"
        label={t('create-new-quest.input.expected-participants')}
        defaultCount={parseInt(expectedParticipants)}
      />
      {/*       <MultiSelectInput
        defaultOptions={environmentOptions}
        placeholder={t('quest.placeholder.environment')}
        id="environment"
        label={t('create-new-quest.input.environment')}
        hint={t('create-new-quest.hint.environment')}
      /> */}
      {/*       <MultiSelectInput
        defaultOptions={equipmentOptions}
        placeholder={t('quest.placeholder.equipment')}
        id="equipment"
        label={t('create-new-quest.input.equipment')}
        hint={t('create-new-quest.hint.equipment')}
      /> */}
      {/*       <MultiSelectInput
        defaultOptions={accessibilityOptions}
        placeholder={t('quest.placeholder.accessibility')}
        id="accessibility"
        label={t('create-new-quest.input.accessibility')}
        hint={t('create-new-quest.hint.accessibility')}
      /> */}
      {/*   <button type="submit" className="quest-form__button">
        <QuestButton type="start" />
      </button> */}
    </Form>
  );
}

export default EditQuestForm;
