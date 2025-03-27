import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/i18n';
import TopBar from './components/display/TopBar';
import FatalError from './pages/FatalError';

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

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap',
    },
  ];
};

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body
        style={{
          height: '100vh',
          color: '#B71C1C',
          backgroundColor: '#FFCDD2',
        }}
      >
        <I18nextProvider i18n={i18n} defaultNS={'translation'}>
          <FatalError />
          <Scripts />
        </I18nextProvider>
      </body>
    </html>
  );
}

export default function App() {
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
          <div className="main-container">
            <TopBar />
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
