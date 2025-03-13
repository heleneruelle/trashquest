import { Marker } from 'react-map-gl/mapbox';
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
  type = 'other',
}: {
  quest: QuestType;
  type?: 'other' | 'creator';
}) {
  return (
    <Marker
      key={`quest-position-marker-${quest.id}`}
      latitude={quest.location.coordinates._latitude}
      longitude={quest.location.coordinates._longitude}
      style={{ zIndex: 100 }}
    >
      <div
        className={`quest-position-marker quest-position-marker__${type} ${
          quest.properties.isClosest ? 'quest-position-marker__closest' : ''
        }`}
      >
        {getIconForQuestEnv({
          isClosest: quest.properties?.isClosest,
          environment: quest.properties.environment,
        })}
      </div>
    </Marker>
  );
}

export default QuestMarker;
