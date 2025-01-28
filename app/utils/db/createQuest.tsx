import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import dateTimeStartEndValidation from '../datetime/dateTimeStartEndValidation';
import { auth, db } from '~/firebaseConfig';

const createQuest = async (formData) => {
  if (!auth.currentUser?.uid) {
    return { error: 'user' };
  }

  const formObj: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    formObj[key] = value;
  });

  const startDate = String(formObj.startDate);
  const startTime = String(formObj.startTime);
  const endDate = String(formObj.endDate);
  const endTime = String(formObj.endTime);
  const locationId = String(formObj.locationId);

  if (!locationId) {
    return { error: 'location' };
  }
  if (!dateTimeStartEndValidation(startDate, endDate, startTime, endTime)) {
    return { error: 'datetime' };
  }

  const locationName = String(formObj.locationName);
  const locationLatitude = String(formObj.locationLatitude);
  const locationLongitude = String(formObj.locationLongitude);
  const description = String(formObj.description);
  const expectedParticipants = String(formObj.expectedParticipants);
  const environment = String(formObj.environment);
  const equipment = String(formObj.equipment);
  const accessibility = String(formObj.accessibility);
  const name = String(formObj.name);
  const country = String(formObj.country);

  const questsCollection = collection(db, 'quests');

  const docRef = await addDoc(questsCollection, {
    location: {
      country,
      name: locationName,
      id: locationId,
      latitude: locationLatitude,
      longitude: locationLongitude,
    },
    properties: {
      description,
      expectedParticipants,
      environment,
      equipment,
      accessibility,
      name,
      participants: 1,
      creatorId: auth.currentUser.uid,
    },
    createdAt: serverTimestamp(),
  });

  return { quest: docRef };
};

export default createQuest;
