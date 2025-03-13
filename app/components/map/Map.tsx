import { useMatches } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import UserPosition from '../display/map/UserPosition';
import Pin from '../display/Pin';
import { MdHome } from 'react-icons/md';
import findCenterFromBbox from '~/utils/map/findCenterFromBbox';
import getBboxFromPoints from '~/utils/map/getBboxFromPoints';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComp() {
  const matches = useMatches();
  const { t } = useTranslation();

  const { user, quests, creatorQuests } =
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
        zoom: 9,
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

  const renderMarker = (longitude, latitude, label, className) => (
    <Popup
      key={`marker-${longitude}-${latitude}`}
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
    >
      <div className={`user-marker__tooltip ${className}`}>
        <p>{label}</p>
      </div>
    </Popup>
  );

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    >
      {/*  {quest?.location?.coordinates &&
        renderMarker(
          quest.location.coordinates._longitude,
          quest.location.coordinates._latitude,
          quest.properties.name,
          'quest'
        )}
      {otherQuests?.map((singleQuest) =>
        renderMarker(
          singleQuest.location.coordinates._longitude,
          singleQuest.location.coordinates._latitude,
          singleQuest.properties.name,
          'other'
        )
      )}
      {userQuests?.map((userQuest) =>
        renderMarker(
          userQuest.location.coordinates._longitude,
          userQuest.location.coordinates._latitude,
          userQuest.properties.name,
          'creator'
        )
      )} */}
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
