import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  //useLoaderData,
} from '@remix-run/react';
import { I18nextProvider } from 'react-i18next';
//import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
//import { logoutAction } from '~/loaders/logout';
import i18n from '~/i18n';
import LanguageSwitcher from '~/components/LanguageSwitch';
import { LoaderFunctionArgs } from '@remix-run/node';
import { getSession } from '~/utils/auth/session.server';

//export { logoutAction as action };

type LoaderData = {
  isAuthenticated: boolean;
};

export let loader = async ({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> => {
  // Session handle
  const session = await getSession(request.headers.get('Cookie'));
  const userId = session.get('userId');

  return { isAuthenticated: userId ? true : false };
};

export default function App() {
  const { t } = useTranslation();
  //const { isAuthenticated } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <I18nextProvider i18n={i18n} defaultNS={'translation'}>
          <div style={{ height: '100%' }}>
            <div className="top-bar">
              <LanguageSwitcher />
              {/* {isAuthenticated && (
                <Form method="post">
                  <button type="submit">{t('logout.cta')}</button>
                </Form>
              )} */}
            </div>
            <div className="content">
              <Outlet />
            </div>
          </div>
        </I18nextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
