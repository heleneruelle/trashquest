import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@remix-run/react';
import { useRef, useState } from 'react';
import TextField from '../inputs/TextField';
import LocationAutoComplete from '../inputs/LocationAutocomplete';
import DatePicker from '../inputs/DatePicker';
import TimePicker from '../inputs/TimePicker';
import Button from '../inputs/Button';
import Counter from '../inputs/Counter';
import SelectWithTags from '../inputs/SelectWithTags';
import TextArea from '../inputs/TextArea';
import Toast from '../notifications/Toast';
import dateToYYYYMMDD from '~/utils/datetime/dateToYYYYMMDD';
import timeToHHMM from '~/utils/datetime/timeToHHMM';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import formDataToObject from '~/utils/formDataToObject';
import { questEnvironment, questEquipment, questAccessibility } from '~/config';
import i18n from '~/i18n';
import { auth } from '~/firebaseConfig';

//comment

function QuestForm() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleCreateQuest = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const idToken = await auth.currentUser?.getIdToken();

    if (!idToken) {
      setError('Token is missing');
      return;
    }

    try {
      const response = await fetch('/api/create-quest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(formDataToObject(formData)),
      });
      const resp = await response.json();
      if (resp.error || !resp.quest) {
        return setError(resp.error);
      } else if (resp.questId) {
        return navigate(createCompositeUrl(i18n, `/quest/${resp.quest.id}`));
      }
    } catch (error) {
      return setError(`Error creating quest: ${error}`);
    }
  };

  return (
    <Form ref={formRef} className="form" onSubmit={handleCreateQuest}>
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
      />
      <LocationAutoComplete
        hint={t('create-new-quest.hint.location')}
        types={['address', 'place']}
        poi={true}
      />
      <fieldset>
        <legend className="date-time">
          {t('create-new-quest.input.start')}
        </legend>
        <div className="date-time-picker-container">
          <DatePicker
            id="startDate"
            name="startDate"
            defaultValue={dateToYYYYMMDD(new Date())}
            min={dateToYYYYMMDD(new Date())}
          />
          <TimePicker
            id="startTime"
            name="startTime"
            defaultValue={timeToHHMM(new Date())}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="date-time">{t('create-new-quest.input.end')}</legend>
        <div className="date-time-picker-container">
          <DatePicker
            id="endDate"
            name="endDate"
            defaultValue={dateToYYYYMMDD(new Date())}
            min={dateToYYYYMMDD(new Date())}
          />
          <TimePicker
            id="endTime"
            name="endTime"
            defaultValue={timeToHHMM(new Date())}
          />
        </div>
      </fieldset>
      <TextArea
        id="description"
        name="description"
        label={t('create-new-quest.input.description')}
        hint={t('create-new-quest.hint.description')}
      />
      <Counter
        id="expectedParticipants"
        name="expectedParticipants"
        label={t('create-new-quest.input.expected-participants')}
      />
      <SelectWithTags
        options={questEnvironment}
        fieldset="environment"
        label={t('create-new-quest.input.environment')}
        hint={t('create-new-quest.hint.environment')}
      />
      <SelectWithTags
        options={questEquipment}
        fieldset="equipment"
        label={t('create-new-quest.input.equipment')}
        hint={t('create-new-quest.hint.equipment')}
      />
      <SelectWithTags
        options={questAccessibility}
        fieldset="accessibility"
        label={t('create-new-quest.input.accessibility')}
        hint={t('create-new-quest.hint.accessibility')}
      />
      <Button type="submit" label="Begin the Quest !" />
    </Form>
  );
}

export default QuestForm;
