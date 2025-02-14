import { useMatches } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Map, { Marker } from 'react-map-gl/mapbox';
import Pin from '../display/Pin';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComp() {
  const matches = useMatches();
  const { user } =
    matches.find((match) => match.id === 'routes/$lang._index')?.data || {};

  const { t } = useTranslation();

  const [viewState, setViewState] = useState({
    longitude: 2.285358886316118,
    latitude: 46.71832756395037,
    zoom: 10.2,
  });

  useEffect(() => {
    if (
      user?.location?.coordinates?._longitude &&
      user?.location?.coordinates?._latitude
    ) {
      setViewState((prev) => ({
        ...prev,
        longitude: user?.location?.coordinates?._longitude,
        latitude: user?.location?.coordinates?._latitude,
      }));
    }
  }, [user?.location?.coordinates]);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    >
      {user?.location?.coordinates ? (
        <Marker
          key={`user-marker`}
          longitude={user?.location?.coordinates._longitude}
          latitude={user?.location?.coordinates._latitude}
          anchor="bottom"
        >
          <div className="user-marker__tooltip">
            <p>{t('map.user-position')}</p>
          </div>
          <Pin />
        </Marker>
      ) : null}
    </Map>
  );
}

export default MapComp;
