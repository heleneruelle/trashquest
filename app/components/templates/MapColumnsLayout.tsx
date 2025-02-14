import { Outlet, useMatches } from '@remix-run/react';
import { useLocation } from '@remix-run/react';
import Map from '~/components/map/Map';
import TwoColumnsLayout from './TwoColumnsLayout';
import { useMemo } from 'react';

function MapColumnsLayout() {
  const { pathname } = useLocation();
  const matches = useMatches();

  const { user } =
    matches.find((match) => match.id === 'routes/$lang._index')?.data || {};

  const leftColumnWidth = useMemo(() => {
    if (
      !user ||
      pathname.includes('login') ||
      pathname.includes('sign-up') ||
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
