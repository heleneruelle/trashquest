const generateCircle = (center, radius, points = 64) => {
  const coords = [];
  const earthRadius = 6371000;

  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * (2 * Math.PI);
    const dx = radius * Math.cos(angle);
    const dy = radius * Math.sin(angle);

    const newLat = center[1] + (dy / earthRadius) * (180 / Math.PI);
    const newLng =
      center[0] +
      (dx / (earthRadius * Math.cos((center[1] * Math.PI) / 180))) *
        (180 / Math.PI);

    coords.push([newLng, newLat]);
  }

  return coords;
};

export default generateCircle;
