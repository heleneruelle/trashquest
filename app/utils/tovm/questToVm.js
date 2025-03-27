import dateTimeToISODatetime from '../datetime/dateTimeToISODatetime';
import getDurationFromDateTimes from '../datetime/getDurationFromDateTimes';
import { SUPPORTED_LANGUAGES } from '../../config';

function questToVm(quest, currentUser, creator) {
  const startDateTime = dateTimeToISODatetime({
    date: quest.properties.startDate,
    time: quest.properties.startTime,
  });
  const endDateTime = dateTimeToISODatetime({
    date: quest.properties.endDate,
    time: quest.properties.endTime,
  });
  const duration = getDurationFromDateTimes({ startDateTime, endDateTime });
  const date = new Date(startDateTime);
  const formattedStart = Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [
      lang,
      {
        date: new Intl.DateTimeFormat(lang, {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        }).format(date),
        time: new Intl.DateTimeFormat(lang, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(date),
      },
    ])
  );
  const isQuestFull =
    quest.properties.participants.length ===
    quest.properties.expectedParticipants;
  const isCurrentUserRegisteredForQuest =
    quest.properties.participants.includes(currentUser.id);
  const isCurrentUserCreator = quest.properties.creatorId === currentUser.id;
  const isPast = new Date() > new Date(endDateTime);

  const data = {
    ...quest,
    properties: {
      ...quest.properties,
      startDateTime,
      endDateTime,
      duration,
      isQuestFull,
      isCurrentUserRegisteredForQuest,
      isCurrentUserCreator,
      formattedDateTime: {
        start: formattedStart,
      },
      isPast,
    },
    ...(isCurrentUserCreator ? { creator: currentUser } : { creator }),
  };
  return data;
}

export default questToVm;
