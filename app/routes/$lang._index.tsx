import { LinksFunction } from '@remix-run/node';
import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import useAuth from '~/hooks/useAuth';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import Loading from '~/pages/Loading';
import Welcome from '~/pages/Welcome';
import i18n from '~/i18n';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/welcome.css' },
  ];
};

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate(createCompositeUrl(i18n, '/home'));
    }
  }, [user, loading, navigate]);

  if (!user && !loading) {
    return <Welcome />;
  }

  return <Loading />;
}
