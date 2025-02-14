function findCenterFromBbox(bbox) {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  const bboxCenterLon = (minLon + maxLon) / 2;
  const bboxCenterLat = (minLat + maxLat) / 2;

  return {
    bboxCenterLon,
    bboxCenterLat,
  };
}

export default findCenterFromBbox;
