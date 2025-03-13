import { Marker } from 'react-map-gl/mapbox';
import { MdHome } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function UserPosition({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) {
  const { t } = useTranslation();
  return (
    <Marker
      key="user-position-marker"
      latitude={latitude}
      longitude={longitude}
      style={{ zIndex: 100, gap: '3px' }}
    >
      <div className="user-position-marker">
        <MdHome size={20} />
        {t('map.user-position')}
      </div>
      <FaCircle size={10} color="#000000" />
    </Marker>
  );
}

export default UserPosition;
