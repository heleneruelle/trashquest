import { db, admin } from '~/utils/auth/firebaseAdminAuth';
import { getCookie } from '~/utils/cookies';
import { verifyIdToken } from '~/utils/auth/firebaseAdminAuth';
import currentUserLoader from './currentUser';
import filterQuest from '~/utils/quests/filterQuest';
import findClosestQuests from '~/utils/quests/findClosestQuest';

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
    const userLoaderResp = await currentUserLoader({ request });
    const { user } = await userLoaderResp.json();

    const now = new Date();
    const currentTimestamp = admin.firestore.Timestamp.fromDate(now);

    let query = db
      .collection('quests')
      .where('properties.startDateTimeTimestamp', '>', currentTimestamp)
      .where('properties.creatorId', '!=', user.id)
      .orderBy('properties.startDateTimeTimestamp');

    const querySnapshot = await query.get();

    const rawData: { id: string }[] = [];
    querySnapshot.forEach((doc) => {
      rawData.push({ id: doc.id, ...doc.data() });
    });

    const quests = rawData.filter((q) =>
      filterQuest(q, environment, equipment, accessibility)
    );

    const closestQuest = quests?.length
      ? await findClosestQuests(
          {
            lat: user?.location?.coordinates?._latitude,
            lon: user?.location?.coordinates?._longitude,
          },
          quests
        )
      : null;

    return Response.json({
      success: true,
      quests:
        quests?.length && closestQuest
          ? quests.filter((q) => q.id !== closestQuest.id)
          : [],
      rawData,
      closestQuest,
      user,
    });
  } catch (error) {
    return Response.json({ error: JSON.stringify(error) }, { status: 500 });
  }
}

export default questsLoader;
