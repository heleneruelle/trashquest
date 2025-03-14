import { MarkerEvent } from 'react-map-gl/mapbox';
import { useState, useCallback, useEffect, useRef } from 'react';
import QuestPopup from './QuestPopup';
import QuestMarker from './QuestMarker';
import QuestType from '~/types/quest';

function Quest({ quest }: { quest: QuestType }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMarkerClick = useCallback(
    (e: MarkerEvent<MouseEvent>) => {
      e.originalEvent?.stopPropagation();
      setIsPopupVisible(true);
    },
    [isPopupVisible]
  );

  const handlePopupClose = useCallback(() => {
    setIsPopupVisible(false);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      !(
        event.target instanceof HTMLElement &&
        event.target.id === `quest-position-marker-${quest.id}`
      )
    ) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      key={`quest-position-marker-${quest.id}`}
      id={`quest-position-marker-${quest.id}`}
      ref={containerRef}
    >
      {isPopupVisible ? (
        <QuestPopup quest={quest} onClose={handlePopupClose} />
      ) : (
        <QuestMarker quest={quest} onClick={handleMarkerClick} />
      )}
    </div>
  );
}

export default Quest;
