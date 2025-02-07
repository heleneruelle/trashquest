import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComp() {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default MapComp;
