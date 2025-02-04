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
    participants: number;
    creatorId: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };
  createdAt: {
    _nanoseconds: number;
    _seconds: number;
  };
}
