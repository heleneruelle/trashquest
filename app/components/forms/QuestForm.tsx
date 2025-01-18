import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import TextField from '../inputs/TextField';
import LocationAutoComplete from '../inputs/LocationAutocomplete';
import DatePicker from '../inputs/DatePicker';
import TimePicker from '../inputs/TimePicker';
import Button from '../inputs/Button';
import Counter from '../inputs/Counter';
import dateToYYYYMMDD from '~/utils/datetime/dateToYYYYMMDD';
import timeToHHMM from '~/utils/datetime/timeToHHMM';
import { questEnvironment, questEquipment, questAccessibility } from '~/config';
import SelectWithTags from '../inputs/SelectWithTags';
import TextArea from '../inputs/TextArea';

function QuestForm() {
  const { t } = useTranslation();

  return (
    <Form method="post" className="form">
      <TextField
        type="text"
        name="name"
        label={t('create-new-quest.input.name')}
      />
      <LocationAutoComplete />
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
