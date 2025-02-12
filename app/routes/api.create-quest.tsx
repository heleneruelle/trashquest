import { ActionFunction } from '@remix-run/node';
import { db, verifyIdToken, admin } from '~/utils/auth/firebaseAdminAuth';
import dateTimeStartEndValidation from '~/utils/datetime/dateTimeStartEndValidation';
import dateTimeToISODatetime from '~/utils/datetime/dateTimeToISODatetime';

export let action: ActionFunction = async ({ request }) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return Response.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await verifyIdToken(token);

    const formData = await request.json();

    const {
      startDate,
      startTime,
      endDate,
      endTime,
      locationId,
      locationName,
      locationLatitude,
      locationLongitude,
      description,
      expectedParticipants,
      environment,
      equipment,
      accessibility,
      name,
      country,
    } = formData;

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
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return Response.json({ success: true, questId: questRef.id });
  } catch (error) {
    return Response.json({ error: JSON.stringify(error) }, { status: 500 });
  }
};
