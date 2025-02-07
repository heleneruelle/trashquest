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
  const isQuestFull =
    quest.properties.participants.length ===
    quest.properties.expectedParticipants;
  const data = {
    ...quest,
    properties: {
      ...quest.properties,
      startDateTime,
      endDateTime,
      duration,
      isQuestFull,
    },
    creator,
  };
  return data;
}

export default questToVm;
