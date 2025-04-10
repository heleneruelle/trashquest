import { LoaderFunctionArgs } from '@remix-run/node';
import questsForUser from './questsForUser';
import currentUserLoader from './currentUser';
import { db } from '~/utils/auth/firebaseAdminAuth';
import questToVm from '~/utils/tovm/questToVm';

async function userLoader(args: LoaderFunctionArgs) {
  try {
    const { params } = args;
    const { id } = params;

    if (!id) {
      throw new Error('Missing user id in userLoader');
    }

    const userDocRef = db.collection('users').doc(id);

    const user = await userDocRef
      .get()
      .then((userDoc) => {
        if (userDoc.exists) {
          return { id: userDoc.id, ...userDoc.data() };
        } else {
          throw new Error(`No user document for id : ${id}`);
        }
      })
      .catch((userDocError) => {
        throw new Error(`Error getting user document: ${userDocError}`);
      });

    const userLoaderResp = await currentUserLoader(args);
    const { user: currentUser } = await userLoaderResp.json();

    const isCurrentUserProfile = currentUser.id === id;

    const questsForUserResp = await questsForUser(args);
    const { success, quests } = await questsForUserResp.json();

    const questsVm =
      success && quests?.length
        ? quests.map((q) => questToVm(q, currentUser, user))
        : null;

    return Response.json({
      success: true,
      user,
      quests: questsVm,
      isCurrentUserProfile,
    });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default userLoader;
