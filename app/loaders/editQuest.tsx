import { admin } from '~/utils/auth/firebaseAdminAuth';
import { ActionFunctionArgs } from '@remix-run/node';
import dateTimeToISODatetime from '~/utils/datetime/dateTimeToISODatetime';

async function editQuestLoader({ request, params }: ActionFunctionArgs) {
  try {
    const { id } = params;

    if (!id) {
      throw new Error('No idea for current user');
    }

    const formData = await request.json();

    const {
      name,
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
      country,
    } = formData;

    if (!locationId) {
      throw new Error('Location is unvalid');
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

    const questRef = admin.firestore().collection('quests').doc(id);

    await questRef.update({
      'location.country': country,
      'location.name': locationName,
      'location.id': locationId,
      'location.coordinates': new admin.firestore.GeoPoint(
        parseFloat(locationLatitude),
        parseFloat(locationLongitude)
      ),
      'properties.description': description,
      'properties.expectedParticipants': parseInt(expectedParticipants),
      'properties.name': name,
      'properties.startDate': startDate,
      'properties.startDateTimeTimestamp': startDateTimeTimestamp,
      'properties.startTime': startTime,
      'properties.endDate': endDate,
      'properties.endDateTimeTimestamp': endDateTimeTimestamp,
      'properties.endTime': endTime,
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export default editQuestLoader;
