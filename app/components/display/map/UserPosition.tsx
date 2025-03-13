import { Marker } from 'react-map-gl/mapbox';
import { MdHome } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { TiArrowSortedDown } from 'react-icons/ti';
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
      style={{ zIndex: 100 }}
    >
      <div className="user-position-marker">
        <MdHome size={20} />
        {t('map.user-position')}
      </div>
      <TiArrowSortedDown size={24} color="#0a0d77" />
    </Marker>
  );
}

export default UserPosition;
