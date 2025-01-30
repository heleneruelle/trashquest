import { ActionFunction } from '@remix-run/node';
import { verifyIdToken } from '~/utils/auth/firebaseAdminAuth';

export let action: ActionFunction = async ({ request }) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return Response.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await verifyIdToken(token);

    return Response.json({ user: decodedToken });
  } catch (error) {
    return Response.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
};
