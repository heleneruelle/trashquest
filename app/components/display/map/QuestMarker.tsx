import { Marker, MarkerEvent } from 'react-map-gl/mapbox';
import { PiSword } from 'react-icons/pi';
import { IoStar } from 'react-icons/io5';
import { TiWaves } from 'react-icons/ti';
import { MdLocationCity } from 'react-icons/md';
import { PiPersonSimpleHikeBold } from 'react-icons/pi';
import QuestType from '~/types/quest';

function getIconForQuestEnv({
  isClosest,
  environment,
}: {
  isClosest: boolean | undefined;
  environment: Array<string>;
}) {
  if (isClosest) {
    return <IoStar size={20} />;
  } else if (environment.includes('see') || environment.includes('river')) {
    return <TiWaves size={20} />;
  } else if (environment.includes('city')) {
    return <MdLocationCity size={20} />;
  } else if (environment.includes('hike')) {
    return <PiPersonSimpleHikeBold size={20} />;
  } else return <PiSword size={20} />;
}

function QuestMarker({
  quest,
  onClick,
}: {
  quest: QuestType;
  onClick: (e: MarkerEvent<MouseEvent>) => void;
}) {
  const { properties, location } = quest;
  const type = properties.isCurrentUserCreator ? 'creator' : 'other';

  return (
    <Marker
      latitude={location.coordinates._latitude}
      longitude={location.coordinates._longitude}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <div
        className={`quest-position-marker quest-position-marker__${type} ${
          properties.isClosest ? 'quest-position-marker__closest' : ''
        }`}
      >
        {getIconForQuestEnv({
          isClosest: properties?.isClosest,
          environment: properties.environment,
        })}
      </div>
    </Marker>
  );
}

export default QuestMarker;
