import { db } from '~/utils/auth/firebaseAdminAuth';

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

    const queries = [];
    if (environment) {
      const environmentQuery = db
        .collection('quests')
        .where(
          'properties.environment',
          'array-contains-any',
          environment?.split(',')
        );
      queries.push(environmentQuery.get());
    }
    if (equipment) {
      const equipmentQuery = db
        .collection('quests')
        .where(
          'properties.equipment',
          'array-contains-any',
          equipment?.split(',')
        );
      queries.push(equipmentQuery.get());
    }

    if (accessibility) {
      const accessibilityQuery = db
        .collection('quests')
        .where(
          'properties.accessibility',
          'array-contains-any',
          accessibility?.split(',')
        );
      queries.push(accessibilityQuery.get());
    }

    if (queries.length === 0) {
      queries.push(db.collection('quests').get());
    }

    const snapshots = await Promise.all(
      queries.length > 0 ? queries : [Promise.resolve({ docs: [] })]
    );

    const [envSnapshot, eqSnapshot, accSnapshot] = snapshots;

    const combinedData = [
      ...(envSnapshot?.docs || []).map((doc) => doc.id),
      ...(eqSnapshot?.docs || []).map((doc) => doc.id),
      ...(accSnapshot?.docs || []).map((doc) => doc.id),
    ];

    const data = await Promise.all(
      combinedData.map(async (id) => {
        const doc = await db.collection('quests').doc(id).get();
        return { id, ...doc.data() };
      })
    );

    return Response.json({
      success: true,
      quests: data,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export default questsLoader;
