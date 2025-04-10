import { useMatches } from '@remix-run/react';
import { useEffect, useState } from 'react';
import Map, { NavigationControl, ScaleControl } from 'react-map-gl/mapbox';
import QuestWithWalkingDistance from '../display/map/QuestWithWalkingDistance';
import UserPosition from '../display/map/UserPosition';
import Quest from '~/components/display/map/Quest';
import Legend from '../display/map/Legend';
import findCenterFromBbox from '~/utils/map/findCenterFromBbox';
import getBboxFromPoints from '~/utils/map/getBboxFromPoints';
import mergeArrays from '~/utils/mergeArrays';
import QuestType from '~/types/quest';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComp() {
  const matches = useMatches();

  const { user, quests, creatorQuests, closestQuest } =
    matches.find((match) => match.id === 'routes/$lang.home')?.data || {};
  const { quest } =
    matches.find((match) => match.id === 'routes/$lang.quest.$id')?.data || {};

  const { data: myQuests } =
    matches.find((match) => match.id === 'routes/$lang.my-quests.$type')
      ?.data || {};

  const userLocation = user?.location?.coordinates || null;
  const displayQuests = mergeArrays(creatorQuests, myQuests, quests);

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
        zoom: 15,
      });
    } else if (displayQuests?.length) {
      const allQuestsLocation = displayQuests.map((q) => [
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
  }, [quest, quests, creatorQuests, myQuests, user?.location?.coordinates]);

  const hasAnyQuest = !quest || (!displayQuests && !closestQuest);

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
        <QuestWithWalkingDistance quest={quest} />
      )}
      {displayQuests?.map((q: QuestType) => (
        <Quest key={q.id} quest={q} />
      ))}
      {closestQuest && <Quest quest={closestQuest} />}
      {userLocation && (
        <UserPosition
          longitude={userLocation._longitude}
          latitude={userLocation._latitude}
        />
      )}
      {!hasAnyQuest && <Legend />}
    </Map>
  );
}

export default MapComp;
