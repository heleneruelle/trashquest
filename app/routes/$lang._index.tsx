import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { logoutAction } from '~/loaders/logout';
import { useTranslation } from 'react-i18next';
import { LoaderFunctionArgs } from '@remix-run/node';
import { getSession } from '~/utils/auth/session.server';
import { redirect } from '@remix-run/node';
import i18nServer from '../i18n.server';
import createCompositeUrl from '~/utils/url/createCompositeUrl';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: '/styles/main.css' }];
};

export { logoutAction as action };

type LoaderData = {
  isAuthenticated: boolean;
  userId: string;
};

export let loader = async ({
  params,
  request,
}: LoaderFunctionArgs): Promise<LoaderData> => {
  // Session handle
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');

  const url = new URL(request.url);
  const pathname = url.pathname;

  if (!userId) {
    console.log('HELLO');
    throw redirect(createCompositeUrl(i18nServer, '/login'));
  }
  return { isAuthenticated: true, userId };
};

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="welcome__container--wip">
      <h1>{t('welcome')}</h1>
      <p className="welcome__description">
        🏗️ TrashQuest connects communities to clean up public spaces and protect
        nature.
        <br /> It is a work in progress, please find the project description{' '}
        <a href="https://github.com/heleneruelle/trashquest/blob/main/README.md">
          in our github repository
        </a>{' '}
        <br />
        and contact <strong>heleneruelle@hotmail.com</strong> if you want to
        join !
      </p>
      <Form method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
