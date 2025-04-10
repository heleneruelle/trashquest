import { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/auth/firebaseAdminAuth';
import getQueryForType from '~/utils/quests/getQueryForType';
import {
  HOST,
  //PARTICIPANT
} from '~/config';

async function questsForUser({ params }: LoaderFunctionArgs) {
  try {
    const { id } = params;
    if (!id) {
      throw new Error('Missing id parameter in questsForUser loader');
    }
    const questsRef = db.collection('quests');
    const hostQuests = getQueryForType(HOST, id, questsRef);
    // TODO handle quest for participant (the issue here is that the questToVm function has to take the user info of the quest creator, in this situation it could be refactored to avoid pressure on server)
    //const participantQuests = getQueryForType(PARTICIPANT, id, questsRef);
    const response = await Promise.all(hostQuests.map((q) => q.get()));

    const data = Array.from(
      new Map(
        response.flatMap((snapshot) =>
          snapshot.docs.map((doc) => [doc.id, { id: doc.id, ...doc.data() }])
        )
      ).values()
    );

    return Response.json(
      {
        success: true,
        quests: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default questsForUser;
