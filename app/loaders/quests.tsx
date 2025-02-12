import { db, admin } from '~/utils/auth/firebaseAdminAuth';
import currentUserLoader from './currentUser';
import filterQuest from '~/utils/quests/filterQuest';

async function questsLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const environment = url.searchParams.get('environment');
  const equipment = url.searchParams.get('equipment');
  const accessibility = url.searchParams.get('accessibility');

  try {
    /* 
    TODO implement pagination with filtering
    const snapshot = await db.collection('your-collection')
      .orderBy('someField') // Optionnel, mais souvent nécessaire pour garantir l'ordre
      .limit(25) // Limite de 25 documents
      .get();
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    const nextSnapshot = await db.collection('your-collection')
      .orderBy('someField')
      .startAfter(lastVisible)
      .limit(25)
      .get();
    */

    const now = new Date();
    const currentTimestamp = admin.firestore.Timestamp.fromDate(now);

    let query = db
      .collection('quests')
      .where('properties.startDateTimeTimestamp', '>', currentTimestamp);

    const querySnapshot = await query.get();

    const rawData: { id: string }[] = [];
    querySnapshot.forEach((doc) => {
      rawData.push({ id: doc.id, ...doc.data() });
    });

    const quests = rawData.filter((q) =>
      filterQuest(q, environment, equipment, accessibility)
    );

    const userLoaderResp = await currentUserLoader({ request });
    const { user } = await userLoaderResp.json();

    return Response.json({
      success: true,
      quests,
      rawData,
      user,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export default questsLoader;
