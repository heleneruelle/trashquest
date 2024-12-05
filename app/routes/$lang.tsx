import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { logoutAction } from '~/loaders/logout';
import { LoaderFunctionArgs } from '@remix-run/node';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '~/config';
import i18nServer from '~/i18n.server';
import { useLoaderData } from '@remix-run/react';
import i18n from '~/i18n';

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
  return [{ rel: 'stylesheet', href: '/styles/main.css' }];
};

type LoaderData = {
  lang: string;
};

export let loader = async ({
  params,
}: LoaderFunctionArgs): Promise<LoaderData> => {
  //Language handle
  const { lang = DEFAULT_LANGUAGE } = params;
  const lngWithDefault = SUPPORTED_LANGUAGES.includes(lang)
    ? lang
    : DEFAULT_LANGUAGE;
  if (i18nServer.language !== lngWithDefault) {
    await i18nServer.changeLanguage(lngWithDefault); // Only change language if needed
  }

  return { lang: lngWithDefault };
};

export { logoutAction as action };

export default function Index() {
  const { lang } = useLoaderData<LoaderData>();

  if (lang !== i18n.language) {
    i18n.changeLanguage(lang);
  }

  return <Outlet />;
}