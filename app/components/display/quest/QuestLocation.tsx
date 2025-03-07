import MapLocationIcon from '~/components/icons/MapLocation';
import QuestType from '~/types/quest';

function QuestLocation({ quest }: { quest: QuestType }) {
  const { location } = quest;
  return (
    <div className="quest-location">
      <MapLocationIcon />
      <p>{location.name}</p>
    </div>
  );
}

export default QuestLocation;
