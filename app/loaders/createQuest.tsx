import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import dateTimeStartEndValidation from '~/utils/datetime/dateTimeStartEndValidation';
import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18nServer from '~/i18n.server';
import { getUser } from '~/utils/auth/session.server';
import { getAuth } from 'firebase/auth';

export async function createQuestAction({ request }: ActionFunctionArgs) {
  const user = await getUser(request);
  const authUser = getAuth().currentUser;
  if (!user || !authUser) {
    return Response.json({ error: `${authUser} user` }, { status: 400 });
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

  console.log('QUEST COLLECTION');

  try {
    const questsCollection = collection(db, 'quests');
    const docRef = await addDoc(questsCollection, {
      location: {
        country,
        name: encodeURIComponent(locationName),
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
        creatorId: user.userId,
      },
      createdAt: serverTimestamp(),
    });
    try {
      return redirect(createCompositeUrl(i18nServer, `/quest/${docRef.id}`));
    } catch (error1) {
      return Response.json(
        { error: `${error1} redirection error` },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json({ error: `${error} server error` }, { status: 400 });
  }
}

export default createQuestAction;
