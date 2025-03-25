import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { DEFAULT_LANGUAGE } from '~/config';
import i18nServer from '~/i18n.server';
import createCompositeUrl from '~/utils/url/createCompositeUrl';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: '/styles/main.css' }];
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.lang) {
    return redirect(
      createCompositeUrl(i18nServer, '/', { language: DEFAULT_LANGUAGE })
    );
  }
};

export default function Index() {
  return (
    <div className="welcome__container--wip">
      <h1>Redirect...</h1>
    </div>
  );
}
