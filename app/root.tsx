import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import i18nServer from '../i18n.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { useLoaderData } from '@remix-run/react';
import { DEFAULT_LANGUAGE } from './config';

type LoaderData = {
  lang: string;
};

export let loader = async ({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> => {
  const url = new URL(request.url);
  const lang = url.pathname.split('/')[1] || DEFAULT_LANGUAGE;
  i18nServer.changeLanguage(lang);
  return { lang };
};

export default function App() {
  const { lang } = useLoaderData<LoaderData>();
  i18n.changeLanguage(lang);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <I18nextProvider i18n={i18n}>
          <Outlet />
        </I18nextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
