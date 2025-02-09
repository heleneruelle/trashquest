import { LoaderFunctionArgs } from '@remix-run/node';
import { db, verifyIdToken } from '~/utils/auth/firebaseAdminAuth';
import { getCookie } from '~/utils/cookies';

async function joinQuestLoader({ request }: LoaderFunctionArgs) {
  try {
    const token = await getCookie(request, 'firebase_token');

    if (!token) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }
    const decodedToken = await verifyIdToken(token);
    const { id } = await request.json();
    if (!id) {
      throw new Error('Id not found in URL');
    }
    const docRef = db.collection('quests').doc(id);
    const data = await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          throw new Error(`No quest document for id : ${id}`);
        }
      })
      .catch((docError) => {
        throw new Error(`Error getting quest document: ${docError}`);
      });

    if (!data) {
      throw new Error(`Document not found for ${id}`);
    }

    await db
      .collection('quests')
      .doc(id)
      .update({
        'properties.participants': [
          ...data.properties.participants,
          decodedToken.uid,
        ],
      });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default joinQuestLoader;
