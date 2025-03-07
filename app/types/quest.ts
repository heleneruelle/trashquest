import UserType from './user';

export default interface QuestType {
  id: string;
  location: {
    country: string;
    name: string;
    id: string;
    latitude: string;
    longitude: string;
  };
  properties: {
    description: string;
    expectedParticipants: string;
    environment: Array<string>;
    equipment: Array<string>;
    accessibility: Array<string>;
    name: string;
    participants: Array<string>;
    creatorId: string;
    startDate: string;
    startTime: string;
    startDateTime: string;
    endDate: string;
    endTime: string;
    isCurrentUserRegisteredForQuest: boolean;
    isCurrentUserCreator: boolean;
    isQuestFull: boolean;
    formattedDateTime: {
      start: {
        [lang: string]: { date: string; time: string };
      };
    };
  };
  creator: UserType;
  createdAt: {
    _nanoseconds: number;
    _seconds: number;
  };
}
