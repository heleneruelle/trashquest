import { db } from '~/utils/auth/firebaseAdminAuth';

async function questsLoader() {
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
    const snapshot = await db.collection('quests').get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Response.json({
      success: true,
      quests: data,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export default questsLoader;
