import type { LinksFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import useAuth from '~/hooks/useAuth';
import i18n from '~/i18n';
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';
import ImageLayout from '~/components/templates/ImageLayout';
import Main from '~/pages/Main';
import createCompositeUrl from '~/utils/url/createCompositeUrl';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/main.css' },
    { rel: 'stylesheet', href: '/styles/form.css' },
  ];
};

export default function Index() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(createCompositeUrl(i18n, '/login'));
    }
  }, [user]);

  return (
    <TwoColumnsLayout>
      <Main />
      <ImageLayout />
    </TwoColumnsLayout>
  );
}
