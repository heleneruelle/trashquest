import { redirect } from '@remix-run/node';
import { getSession, destroySession } from '~/utils/auth/session.server';
import i18nServer from '~/i18n.server';
import createCompositeUrl from '~/utils/url/createCompositeUrl';

let logoutAction = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect(createCompositeUrl(i18nServer, '/login'), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export default logoutAction;
