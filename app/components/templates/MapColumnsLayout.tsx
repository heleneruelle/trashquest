import { Outlet } from '@remix-run/react';
import { useLocation } from '@remix-run/react';
import { useMemo } from 'react';
import useAuth from '~/hooks/useAuth';
import Map from '~/components/map/Map';
import TwoColumnsLayout from './TwoColumnsLayout';

function MapColumnsLayout() {
  const { pathname } = useLocation();

  const isHome = /^\/(fr|en)\/?$/.test(pathname);

  const leftColumnWidth = useMemo(() => {
    if (
      isHome ||
      pathname.includes('login') ||
      pathname.includes('sign-up') ||
      pathname.includes('user/edit') ||
      pathname.includes('about')
    ) {
      return '100%';
    }
  }, [pathname]);

  return (
    <TwoColumnsLayout leftColumnWidth={leftColumnWidth}>
      <Outlet />
      <Map />
    </TwoColumnsLayout>
  );
}

export default MapColumnsLayout;
