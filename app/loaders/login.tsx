import type { ActionFunctionArgs } from '@remix-run/node';
import authenticate from '../utils/auth/authenticate';
import { getSession, commitSession } from '~/utils/auth/session.server';
import { redirect } from '@remix-run/node';

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  try {
    const user = await authenticate({ email, password });
    if (!user) {
      throw new Error('Authentication failed');
    }
    const session = await getSession();
    session.set('userId', user.uid);
    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    console.error('Login action', error);
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    } else {
      return Response.json({ error: 'Authentication failed' });
    }
  }
}
