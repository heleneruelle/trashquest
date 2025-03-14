import { useMatches } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Map, {
  NavigationControl,
  Popup,
  ScaleControl,
} from 'react-map-gl/mapbox';
import UserPosition from '../display/map/UserPosition';
import Quest from '~/components/display/map/Quest';
import findCenterFromBbox from '~/utils/map/findCenterFromBbox';
import getBboxFromPoints from '~/utils/map/getBboxFromPoints';
import QuestType from '~/types/quest';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComp() {
  const matches = useMatches();
  const { t } = useTranslation();

  const { user, quests, creatorQuests, closestQuest } =
    matches.find((match) => match.id === 'routes/$lang._index')?.data || {};
  const { quest } =
    matches.find((match) => match.id === 'routes/$lang.quest.$id')?.data || {};
  const { quests: myQuests, questsAsParticipant } =
    matches.find((match) => match.id === 'routes/$lang.my-quests')?.data || {};

  const userLocation = user?.location?.coordinates || null;
  const userQuests = creatorQuests || myQuests;
  const otherQuests = quests || questsAsParticipant;

  const [viewState, setViewState] = useState({
    longitude: 2.285358886316118,
    latitude: 46.71832756395037,
    zoom: 5,
  });

  useEffect(() => {
    if (quest?.location?.coordinates) {
      setViewState({
        longitude: quest.location.coordinates._longitude,
        latitude: quest.location.coordinates._latitude,
        zoom: 13,
      });
    } else if (otherQuests?.length || userQuests?.length) {
      const allQuestsLocation = [...otherQuests, ...userQuests].map((q) => [
        q.location.coordinates._longitude,
        q.location.coordinates._latitude,
      ]);
      const bbox = getBboxFromPoints(allQuestsLocation);
      const { bboxCenterLon, bboxCenterLat } = findCenterFromBbox(bbox);
      setViewState({
        longitude: bboxCenterLon,
        latitude: bboxCenterLat,
        zoom: 5,
      });
    } else if (userLocation?._longitude && userLocation?._latitude) {
      setViewState(() => ({
        longitude: userLocation._longitude,
        latitude: userLocation._latitude,
        zoom: 5,
      }));
    }
  }, [quest, otherQuests, userQuests, user?.location?.coordinates]);

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    >
      <NavigationControl position="top-left" />
      <ScaleControl />
      {quest?.location?.coordinates && (
        <Popup
          latitude={quest.location.coordinates._latitude}
          longitude={quest.location.coordinates._longitude}
        >
          <div className="quest-popup-start">
            <strong>{t('quest.begin')}</strong>
          </div>
        </Popup>
      )}
      {otherQuests?.map((singleQuest: QuestType) => (
        <Quest quest={singleQuest} />
      ))}
      {userQuests?.map((userQuest: QuestType) => (
        <Quest quest={userQuest} />
      ))}
      {closestQuest && <Quest quest={closestQuest} />}
      {userLocation && (
        <UserPosition
          longitude={userLocation._longitude}
          latitude={userLocation._latitude}
        />
      )}
    </Map>
  );
}

export default MapComp;
