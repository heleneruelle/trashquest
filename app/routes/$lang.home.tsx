import type { LinksFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import questsLoader from '~/loaders/quests';
import Main from '~/pages/Main';
import Loading from '~/pages/Loading';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import useAuth from '~/hooks/useAuth';
import i18n from '~/i18n';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/main.css' },
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/quests.css' },
  ];
};

export const loader = questsLoader;

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate(createCompositeUrl(i18n, '/'));
    }
  }, [user, loading, navigate]);

  if (user && !loading) {
    return <Main />;
  }

  return <Loading />;
}
