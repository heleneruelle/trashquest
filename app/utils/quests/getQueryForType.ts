import { admin } from '~/utils/auth/firebaseAdminAuth';
import { HOST, PARTICIPANT, PAST } from '~/config';

function getQueryForType(
  type: string | undefined,
  userId: string,
  questsRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >
) {
  const now = new Date();
  const currentTimestamp = admin.firestore.Timestamp.fromDate(now);

  switch (type) {
    case HOST:
      return [
        questsRef
          .where('properties.creatorId', '==', userId)
          .where('properties.endDateTimeTimestamp', '>', currentTimestamp)
          .orderBy('properties.startDateTimeTimestamp'),
      ];
    case PARTICIPANT:
      return [
        questsRef
          .where('properties.participants', 'array-contains', userId)
          .where('properties.creatorId', '!=', userId)
          .where('properties.endDateTimeTimestamp', '>', currentTimestamp)
          .orderBy('properties.startDateTimeTimestamp'),
      ];
    case PAST:
      return [
        questsRef
          .where('properties.participants', 'array-contains', userId)
          .where('properties.endDateTimeTimestamp', '<', currentTimestamp)
          .orderBy('properties.startDateTimeTimestamp'),
        questsRef
          .where('properties.creatorId', '==', userId)
          .where('properties.endDateTimeTimestamp', '<', currentTimestamp)
          .orderBy('properties.startDateTimeTimestamp'),
      ];
    default:
      return [];
  }
}

export default getQueryForType;
