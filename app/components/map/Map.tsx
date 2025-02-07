import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComp() {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: 2.285358886316118,
        latitude: 46.71832756395037,
        zoom: 4.772664089144272,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default MapComp;
