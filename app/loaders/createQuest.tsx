import type { ActionFunctionArgs } from '@remix-run/node';
import dateTimeStartEndValidation from '~/utils/datetime/dateTimeStartEndValidation';
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
} from 'firebase/firestore';
import { getSession } from '~/utils/auth/session.server';
import { auth, db } from '../firebaseConfig';
import { getApp } from 'firebase/app';
import generateRandomId from '~/utils/generateRandomId';

export async function createQuestAction({ request }: ActionFunctionArgs) {
  if (!auth.currentUser?.uid) {
    return Response.json({ error: 'user' }, { status: 400 });
  }

  const formData = await request.formData();

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
    return Response.json({ error: 'location' }, { status: 400 });
  }

  if (!dateTimeStartEndValidation(startDate, endDate, startTime, endTime)) {
    return Response.json({ error: 'datetime' }, { status: 400 });
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

  await addDoc(questsCollection, {
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

  return 'Quest created successfully';
}

export default createQuestAction;
