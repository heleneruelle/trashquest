import type { LinksFunction } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import { LoaderFunctionArgs } from '@remix-run/node';
/* import { getSession } from '~/utils/auth/session.server';
import { redirect } from '@remix-run/node';
import i18nServer from '../i18n.server';
import createCompositeUrl from '~/utils/url/createCompositeUrl'; */
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';
import ImageLayout from '~/components/templates/ImageLayout';
import Main from '~/pages/Main';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/main.css' },
    { rel: 'stylesheet', href: '/styles/form.css' },
  ];
};

type LoaderData = {
  isAuthenticated: boolean;
  //userId: string;
};

export let loader = async ({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> => {
  // Session handle
  /* const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');

  if (!userId) {
    throw redirect(createCompositeUrl(i18nServer, '/login'));
  } */
  return { isAuthenticated: true };
};

export default function Index() {
  const { t } = useTranslation();

  return (
    <TwoColumnsLayout>
      <Main />
      <ImageLayout />
    </TwoColumnsLayout>
  );
}
