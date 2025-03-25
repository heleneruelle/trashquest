import { Popup, Source, Layer } from 'react-map-gl/mapbox';
import { useTranslation } from 'react-i18next';
import type { Feature } from 'geojson';
import generateCircle from '~/utils/map/generateCircle';
import generateTextPoints from '~/utils/map/generateTextPoints';
import QuestType from '~/types/quest';

function QuestWithWalkingDistance({ quest }: { quest: QuestType }) {
  const { t } = useTranslation();

  const { location } = quest;
  const center = [
    location.coordinates._longitude,
    location.coordinates._latitude,
  ];
  const radius = 420; // 5 minutes walk

  const circleCoords = generateCircle(center, radius);
  const textGeoJson = generateTextPoints(center, radius);

  const geojson: Feature = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [circleCoords],
    },
    properties: {},
  };

  return (
    <>
      <Source id="circle-source" type="geojson" data={geojson}>
        <Layer
          id="circle-outline"
          type="line"
          paint={{
            'line-color': '#4A90E2',
            'line-width': 3,
          }}
        />
      </Source>
      <Source id="text-source" type="geojson" data={textGeoJson}>
        <Layer
          id="text-layer"
          type="symbol"
          layout={{
            'text-field': ['get', 'text'],
            'text-size': 16,
            'text-anchor': 'center',
            'text-offset': [0, 1],
            'text-rotate': ['get', 'rotation'],
            'text-font': ['Open Sans Bold'],
          }}
          paint={{
            'text-color': '#4A90E2',
            'text-halo-color': '#fff',
            'text-halo-blur': 2,
            'text-halo-width': 2,
          }}
        />
      </Source>
      <Popup
        latitude={quest.location.coordinates._latitude}
        longitude={quest.location.coordinates._longitude}
      >
        <div className="quest-popup-start">
          <strong>{t('quest.begin')}</strong>
        </div>
      </Popup>
    </>
  );
}

export default QuestWithWalkingDistance;
