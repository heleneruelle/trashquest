import { LoaderFunctionArgs } from '@remix-run/node';
import { db, admin } from '~/utils/auth/firebaseAdminAuth';
import currentUserLoader from './currentUser';
import questToVm from '~/utils/tovm/questToVm';
import { HOST, PARTICIPANT, PAST } from '~/config';

function getQueryForType(
  type: string | undefined,
  userId: string,
  questsRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >
) {
  const now = new Date();
  const currentTimestamp = admin.firestore.Timestamp.fromDate(now);

  switch (type) {
    case HOST:
      return [
        questsRef
          .where('properties.creatorId', '==', userId)
          .where('properties.endDateTimeTimestamp', '>', currentTimestamp),
      ];
    case PARTICIPANT:
      return [
        questsRef
          .where('properties.participants', 'array-contains', userId)
          .where('properties.creatorId', '!=', userId)
          .where('properties.endDateTimeTimestamp', '>', currentTimestamp),
      ];
    case PAST:
      return [
        questsRef
          .where('properties.participants', 'array-contains', userId)
          .where('properties.endDateTimeTimestamp', '<', currentTimestamp),
        questsRef
          .where('properties.creatorId', '==', userId)
          .where('properties.endDateTimeTimestamp', '<', currentTimestamp),
      ];
    default:
      return [];
  }
}

async function myQuestsLoader({ request, params }: LoaderFunctionArgs) {
  try {
    const { type } = params;

    const userLoaderResp = await currentUserLoader({ request });
    const { user } = await userLoaderResp.json();

    const questsRef = db.collection('quests');

    const query = getQueryForType(type, user.id, questsRef);

    const response = await Promise.all(query.map((q) => q.get()));

    const data = Array.from(
      new Map(
        response
          .flatMap((snapshot) =>
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
          .map((d) => [d.id, questToVm(d, user)])
      ).values()
    );

    return Response.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default myQuestsLoader;
