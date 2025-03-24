import { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/auth/firebaseAdminAuth';
import currentUserLoader from './currentUser';
import questToVm from '~/utils/tovm/questToVm';
import getFileFromFirebaseStorage from '~/utils/storage/getFileFromFirebaseStorage';

async function questLoader({ request, params }: LoaderFunctionArgs) {
  try {
    const { id } = params;
    if (!id) {
      throw new Error('Id not found in URL');
    }
    const userLoaderResp = await currentUserLoader({ request });
    const { user } = await userLoaderResp.json();

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

    const { properties } = data || {};

    const creatorDocRef = db.collection('users').doc(properties?.creatorId);

    const creatorData = await creatorDocRef
      .get()
      .then((creatorDoc) => {
        if (creatorDoc.exists) {
          return { id: creatorDoc.id, ...creatorDoc.data() };
        } else {
          throw new Error(`No user document for id : ${properties?.creatorId}`);
        }
      })
      .catch((creatorDocError) => {
        throw new Error(`Error getting user document: ${creatorDocError}`);
      });

    const { signedUrl } = await getFileFromFirebaseStorage(
      'trashquest_banner.webp',
      'quest-assets'
    );

    return Response.json({
      success: true,
      quest: questToVm(data, user, creatorData),
      questAsset: signedUrl,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export default questLoader;
