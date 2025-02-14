import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/i18n';
import TopBar from './components/display/TopBar';
import currentUserLoader from './loaders/currentUser';

export const loader = currentUserLoader;

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
