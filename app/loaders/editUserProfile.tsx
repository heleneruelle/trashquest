import { admin } from '~/utils/auth/firebaseAdminAuth';
import { ActionFunctionArgs } from '@remix-run/node';

async function editProfileLoader({ request, params }: ActionFunctionArgs) {
  try {
    const { id } = params;

    if (!id) {
      throw new Error('No idea for current user');
    }

    const formData = await request.json();
    const {
      username,
      locationName,
      locationId,
      locationLatitude,
      locationLongitude,
      country,
    } = formData;

    if (!locationId) {
      throw new Error('Location is unvalid');
    }

    const userRef = admin.firestore().collection('users').doc(id);

    await userRef.update({
      username,
      country,
      'location.name': locationName,
      'location.id': locationId,
      'location.coordinates': new admin.firestore.GeoPoint(
        parseFloat(locationLatitude),
        parseFloat(locationLongitude)
      ),
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export default editProfileLoader;
