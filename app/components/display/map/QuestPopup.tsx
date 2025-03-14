import { Popup, PopupEvent } from 'react-map-gl/mapbox';
import QuestType from '~/types/quest';

function QuestPopup({
  quest,
  onClose,
}: {
  quest: QuestType;
  onClose: (e: PopupEvent) => void;
}) {
  const { location, properties } = quest;

  return (
    <Popup
      latitude={location.coordinates._latitude}
      longitude={location.coordinates._longitude}
      onClose={onClose}
      style={{ zIndex: 100 }}
    >
      <div className="quest-popup">
        <strong>{properties.name}</strong>
        <small>{properties.description}</small>
      </div>
    </Popup>
  );
}

export default QuestPopup;
