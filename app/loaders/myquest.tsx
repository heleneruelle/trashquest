import { LoaderFunctionArgs } from '@remix-run/node';
import { getCookie } from '~/utils/cookies';
import { verifyIdToken } from '~/utils/auth/firebaseAdminAuth';
import { db } from '~/utils/auth/firebaseAdminAuth';

async function myQuestsLoader({ request }: LoaderFunctionArgs) {
  try {
    const token = await getCookie(request, 'firebase_token');

    if (!token) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }
    const decodedToken = await verifyIdToken(token);

    const questsRef = db.collection('quests');
    const query = questsRef.where(
      'properties.creatorId',
      '==',
      decodedToken.uid
    );

    const data = await query
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          throw new Error(`No document found for ${decodedToken.uid}`);
        }
        const quests = [];
        snapshot.forEach((doc) => {
          quests.push(doc.data());
        });

        return quests;
      })
      .catch((err) => {
        throw new Error(`Error while getting data from DB: ${err}`);
      });

    return Response.json({ success: true, quests: data }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default myQuestsLoader;
