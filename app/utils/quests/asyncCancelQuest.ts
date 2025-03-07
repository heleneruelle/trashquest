async function asyncCancelQuest({ id }: { id: string }) {
  try {
    const response = await fetch('/api/cancel-quest', {
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

export default asyncCancelQuest;
