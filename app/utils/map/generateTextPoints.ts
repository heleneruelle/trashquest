import type { Feature, FeatureCollection } from 'geojson';

const generateTextPoint = (
  center,
  radius,
  offset = 10,
  angle = -Math.PI / 2
) => {
  const earthRadius = 6371000;

  const adjustedRadius = radius + offset;

  const dx = adjustedRadius * Math.cos(angle);
  const dy = adjustedRadius * Math.sin(angle);

  const textLat = center[1] + (dy / earthRadius) * (180 / Math.PI);
  const textLng =
    center[0] +
    (dx / (earthRadius * Math.cos((center[1] * Math.PI) / 180))) *
      (180 / Math.PI);

  const featureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [textLng, textLat] },
        properties: { text: '5min de marche' },
      },
    ],
  };

  return featureCollection;
};

export default generateTextPoint;
