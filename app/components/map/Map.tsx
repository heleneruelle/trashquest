import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Map, { Marker } from 'react-map-gl/mapbox';
import Pin from '../display/Pin';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComp() {
  const [root] = useMatches();
  const { t } = useTranslation();

  const { data } = root;
  const { longitude, latitude } = useMemo(() => {
    if (
      data?.user?.location?.coordinates?._longitude &&
      data?.user?.location?.coordinates?._latitude
    ) {
      return {
        longitude: data?.user?.location?.coordinates._longitude,
        latitude: data?.user?.location?.coordinates._latitude,
      };
    } else return {};
  }, [data]);

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: longitude || 2.285358886316118,
        latitude: latitude || 46.71832756395037,
        zoom: 11,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {data?.user?.location?.coordinates ? (
        <Marker
          key={`user-marker`}
          longitude={data?.user?.location?.coordinates._longitude}
          latitude={data?.user?.location?.coordinates._latitude}
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
