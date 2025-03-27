import UserType from './user';

export default interface QuestType {
  id: string;
  location: {
    country: string;
    name: string;
    id: string;
    coordinates: {
      _latitude: number;
      _longitude: number;
    };
  };
  properties: {
    isPast: boolean;
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
    endDateTime: string;
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
    duration: {
      days: number;
      hours: number;
      minutes: number;
    };
    isClosest?: boolean;
  };
  creator: UserType;
  createdAt: {
    _nanoseconds: number;
    _seconds: number;
  };
  bannerUrl: string;
}
