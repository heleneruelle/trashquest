import type { MetaFunction, LoaderFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { getSession } from '../utils/auth/session.server';
import { redirect } from '@remix-run/node';
import { logoutAction } from '~/loaders/logout';
import ImageLayout from '~/components/templates/ImageLayout';

export const meta: MetaFunction = () => {
  return [
    { title: 'TrashQuest' },
    {
      name: 'description',
      content:
        'TrashQuest connects communities to clean up public spaces and protect nature!',
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');

  if (!userId) {
    throw redirect('/login');
  }

  return { isAuthenticated: true, userId };
};

export { logoutAction as action };

export default function Index() {
  return (
    <ImageLayout>
      <h1>Welcome to TrashQuest !</h1>
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
    </ImageLayout>
  );
}
