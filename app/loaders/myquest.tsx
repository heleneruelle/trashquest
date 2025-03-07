import { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/auth/firebaseAdminAuth';
import currentUserLoader from './currentUser';
import questToVm from '~/utils/tovm/questToVm';

async function myQuestsLoader({ request }: LoaderFunctionArgs) {
  try {
    const userLoaderResp = await currentUserLoader({ request });
    const { user } = await userLoaderResp.json();

    const questsRef = db.collection('quests');
    const queryForCreator = questsRef.where(
      'properties.creatorId',
      '==',
      user.id
    );

    const queryForParticipant = questsRef
      .where('properties.participants', 'array-contains', user.id)
      .where('properties.creatorId', '!=', user.id);

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
      questsAsParticipant.push({ id: doc.id, ...doc.data() });
    });

    return Response.json(
      {
        success: true,
        quests: questsForCreator.map((q) => questToVm(q, user)),
        questsAsParticipant: questsAsParticipant.map((q) => questToVm(q, user)),
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default myQuestsLoader;
