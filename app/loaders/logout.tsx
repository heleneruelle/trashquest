import { ActionFunctionArgs } from '@remix-run/node';
import { getSession, destroySession } from '~/utils/auth/session.server';
import signOut from '../utils/auth/signout';
import { redirect } from '@remix-run/node';

export async function logoutAction({ request }: ActionFunctionArgs) {
  await signOut();
  const session = await getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}
