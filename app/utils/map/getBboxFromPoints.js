import { bbox, point, featureCollection } from '@turf/turf';

function getBboxFromPoints(points) {
  const pointFeatures = points.map((pt) => point(pt));

  const pointCollection = featureCollection(pointFeatures);

  return bbox(pointCollection);
}

export default getBboxFromPoints;
