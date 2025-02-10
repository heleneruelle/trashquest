import { LoaderFunctionArgs } from '@remix-run/node';
import { db } from '~/utils/auth/firebaseAdminAuth';

async function cancelQuestLoader({ request }: LoaderFunctionArgs) {
  try {
    const formData = new URLSearchParams(await request.text());
    const id = formData.get('id');
    if (!id) {
      throw new Error('Id not found in URL');
    }
    await db
      .collection('quests')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted');
      })
      .catch((error) => {
        throw new Error(
          `Error ${error} while deleting document for ID : ${id}`
        );
      });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: `${error}` }, { status: 500 });
  }
}

export default cancelQuestLoader;
