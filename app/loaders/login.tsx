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
      throw new Error('Failed to authenticate');
    }
    const session = await getSession();
    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    console.error('Login action', error);
    throw error;
  }
}
