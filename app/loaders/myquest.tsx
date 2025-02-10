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
    const queryForCreator = questsRef.where(
      'properties.creatorId',
      '==',
      decodedToken.uid
    );

    const queryForParticipant = questsRef.where(
      'properties.participants',
      'array-contains',
      decodedToken.uid
    );
    //.where('properties.creatorId', '!=', decodedToken.uid);

    const [creatorSnapshot, participantSnapshot] = await Promise.all([
      queryForCreator.get(),
      queryForParticipant.get(),
    ]);

    const questsForCreator = [];
    creatorSnapshot.forEach((doc) => {
      // console.log('DOC', doc)
      questsForCreator.push({ id: doc.id, ...doc.data() });
    });

    const questsAsParticipant = [];
    participantSnapshot.forEach((doc) => {
      questsAsParticipant.push(doc.data());
    });

    return Response.json(
      { success: true, quests: questsForCreator, questsAsParticipant },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default myQuestsLoader;
