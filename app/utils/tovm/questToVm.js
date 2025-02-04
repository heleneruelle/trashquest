import dateTimeToISODatetime from '../datetime/dateTimeToISODatetime';
import getDurationFromDateTimes from '../datetime/getDurationFromDateTimes';

function questToVm(quest, creator) {
  const startDateTime = dateTimeToISODatetime({
    date: quest.properties.startDate,
    time: quest.properties.startTime,
  });
  const endDateTime = dateTimeToISODatetime({
    date: quest.properties.endDate,
    time: quest.properties.endTime,
  });
  const duration = getDurationFromDateTimes({ startDateTime, endDateTime });
  const data = {
    ...quest,
    properties: {
      ...quest.properties,
      equipment: quest.properties.equipment.split(','),
      environment: quest.properties.environment.split(','),
      accessibility: quest.properties.accessibility.split(','),
      startDateTime,
      endDateTime,
      duration,
    },
    creator,
  };
 console.log('QUEST');
  return data;
}

export default questToVm;
