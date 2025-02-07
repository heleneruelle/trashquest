import { ActionFunction } from '@remix-run/node';
import { verifyIdToken } from '~/utils/auth/firebaseAdminAuth';
import { setCookie } from '~/utils/cookies';

export let action: ActionFunction = async ({ request }) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return Response.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decodedToken = await verifyIdToken(token);

    const cookieHeader = setCookie('firebase_token', token);

    return Response.json({ user: decodedToken }, {
      headers: {
        'Set-Cookie': cookieHeader, 
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
};
