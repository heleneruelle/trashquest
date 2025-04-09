import { ActionFunction } from '@remix-run/node';
import { db, verifyIdToken, admin } from '~/utils/auth/firebaseAdminAuth';
import { getCookie } from '~/utils/cookies';
import dateTimeStartEndValidation from '~/utils/datetime/dateTimeStartEndValidation';
import dateTimeToISODatetime from '~/utils/datetime/dateTimeToISODatetime';
import getAccessibilityLevel from '~/utils/quests/getAccessibilityLevel';

export let action: ActionFunction = async ({ request }) => {
  const token = await getCookie(request, 'firebase_token');

  if (!token) {
    return Response.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await verifyIdToken(token);

    const formData = await request.formData();

    const banner = formData.get('banner');
    const name = formData.get('name');
    const startDate = formData.get('startDate');
    const startTime = formData.get('startTime');
    const endDate = formData.get('endDate');
    const endTime = formData.get('endTime');
    const locationId = formData.get('locationId');
    const locationName = formData.get('locationName');
    const locationLatitude = formData.get('locationLatitude');
    const locationLongitude = formData.get('locationLongitude');
    const description = formData.get('description');
    const expectedParticipants = formData.get('expectedParticipants');
    const environment = formData.get('environment');
    const equipment = formData.get('equipment');
    const accessibility = formData.get('accessibility');
    const country = formData.get('country');

    if (!locationId) {
      return { error: 'location' };
    }
    if (!dateTimeStartEndValidation(startDate, endDate, startTime, endTime)) {
      return { error: 'datetime' };
    }

    const startDateTimeISO = dateTimeToISODatetime({
      date: startDate,
      time: startTime,
    });

    const endDateTimeISO = dateTimeToISODatetime({
      date: endDate,
      time: endTime,
    });

    const startDateTimeTimestamp = admin.firestore.Timestamp.fromDate(
      new Date(startDateTimeISO)
    );
    const endDateTimeTimestamp = admin.firestore.Timestamp.fromDate(
      new Date(endDateTimeISO)
    );

    const { success, downloadUrl } = await sendFileToFirebaseStorage(
      banner,
      uuidv4(),
      'quest-assets'
    );

    const questRef = await db.collection('quests').add({
      location: {
        country,
        name: locationName,
        id: locationId,
        coordinates: new admin.firestore.GeoPoint(
          parseFloat(locationLatitude),
          parseFloat(locationLongitude)
        ),
      },
      properties: {
        description,
        expectedParticipants: parseInt(expectedParticipants),
        environment: environment === '' ? [] : environment.split(','),
        equipment: equipment === '' ? [] : equipment.split(','),
        accessibility: accessibility === '' ? [] : accessibility.split(','),
        name,
        participants: [decodedToken.uid],
        creatorId: decodedToken.uid,
        startDate,
        startDateTimeTimestamp,
        startTime,
        endDate,
        endDateTimeTimestamp,
        endTime,
        accessLevel: getAccessibilityLevel(accessibility),
        downloadUrl: success ? downloadUrl : null,
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return Response.json({ success: true, questId: questRef.id });
  } catch (error) {
    return Response.json({ error: JSON.stringify(error) }, { status: 500 });
  }
};
