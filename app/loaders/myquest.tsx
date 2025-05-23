import { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/auth/firebaseAdminAuth';
import currentUserLoader from './currentUser';
import questToVm from '~/utils/tovm/questToVm';
import getQueryForType from '~/utils/quests/getQueryForType';

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
