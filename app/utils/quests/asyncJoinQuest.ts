async function asyncJoinQuest({ id }: { id: string }) {
  try {
    const response = await fetch('/api/join-quest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
}

export default asyncJoinQuest;
