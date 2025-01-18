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
        label={t('create-new-quest.input.quest-name')}
      />
      <LocationAutoComplete />
      <fieldset>
        <legend className="date-time">Choose quest start date and time</legend>
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
        <legend className="date-time">Choose quest end date and time</legend>
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
        label="description"
        hint="Provide a short description to give more context on your quest. max 3000 char."
      />
      <Counter id="expectedParticipants" name="expectedParticipants" />
      <SelectWithTags
        options={questEnvironment}
        fieldset="environment"
        label="Extra equipment needed"
        hint="Choose as many options as necessary. This will indicate to your guests if they should bring equipment of their own. Otherwise they will assume you will provide everything for the quest."
      />
      <SelectWithTags
        options={questEquipment}
        fieldset="equipment"
        label="Type of environment"
        hint="Choose as many options as necessary. This will indicate to your guests if they should bring equipment of their own. Otherwise they will assume you will provide everything for the quest."
      />
      <SelectWithTags
        options={questAccessibility}
        fieldset="accessibility"
        label="Accessibility level"
        hint="Choose as many options as necessary. This will indicate to your guests if they should bring equipment of their own. Otherwise they will assume you will provide everything for the quest."
      />
      <Button type="submit" label="Begin the Quest !" />
    </Form>
  );
}

export default QuestForm;
