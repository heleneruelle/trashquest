import { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/auth/firebaseAdminAuth';
import questToVm from '~/utils/tovm/questToVm';

async function questLoader({ params }: LoaderFunctionArgs) {
  try {
    const { id } = params;
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

    const { properties } = data || {};

    const creatorDocRef = db.collection('users').doc(data?.creatorId);

    const creatorData = await creatorDocRef
      .get()
      .then((creatorDoc) => {
        if (creatorDoc.exists) {
          return creatorDoc.data();
        } else {
          throw new Error(`No user document for id : ${properties?.creatorId}`);
        }
      })
      .catch((creatorDocError) => {
        throw new Error(`Error getting user document: ${creatorDocError}`);
      });
    const quest = questToVm(data, creatorData);
    console.log('POIOIUOIUOIUOIUOUOIUOI')
  
    return Response.json({
      success: true,
      quest
    });
  } catch (error) {
    console.log('ERROR', error)
    return Response.json({ error }, { status: 500 });
  }
}

export default questLoader;
