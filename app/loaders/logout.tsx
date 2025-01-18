/* import { ActionFunctionArgs } from '@remix-run/node';
import { getSession, destroySession } from '~/utils/auth/session.server'; */
import signOut from '../utils/auth/signout';
import { redirect } from '@remix-run/node';
/* import i18nServer from '~/i18n.server';
import createCompositeUrl from '~/utils/url/createCompositeUrl'; */

/* export async function logoutAction({ request }: ActionFunctionArgs) {
  await signOut();
  const session = await getSession(request.headers.get('Cookie'));
  return redirect(createCompositeUrl(i18nServer, '/login'), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}
 */
export async function logoutAction() {
  await signOut();
  console.log('logout action triggered');
  return redirect('/');
}
