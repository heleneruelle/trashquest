import { Link, useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import Button from '../inputs/Button';
import MapLocationIcon from '../icons/MapLocation';
import EquipmentPillTag from './EquipmentPillTag';
import EnvironmentPillTag from './EnvironmentPillTag copy';
import AccessibilityPillTag from './AccessibilityPillTag';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import asyncJoinQuest from '~/utils/quests/asyncJoinQuest';
import asyncQuitQuest from '~/utils/quests/asyncQuitQuest';
import i18n from '~/i18n';
import QuestType from '~/types/quest';

interface QuestListItemType {
  quest: QuestType;
}

function QuestListItem({ quest }: QuestListItemType) {
  const { id, properties, location } = quest;

  const { t } = useTranslation();
  const questFetcher = useFetcher();

  const date = new Date(properties.startDateTime);
  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat(i18n.language, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  const { equipment, environment, accessibility } = properties;

  async function handleQuestCallback(e: Event) {
    e.preventDefault();
    const data = properties.isCurrentUserRegisteredForQuest
      ? await asyncQuitQuest({ id })
      : await asyncJoinQuest({ id });
    // TODO : error handling on data
    if (data.success) {
      questFetcher.load('/api/quests');
    }
  }

  return (
    <Link
      to={createCompositeUrl(i18n, `/quest/${id}`)}
      className="quest-list-item"
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="quest-list-item__container">
          <div className="quest-list-item__title">
            <h4>{properties.name}</h4>
            <EquipmentPillTag equipment={equipment} />
            <EnvironmentPillTag environment={environment} />
            <AccessibilityPillTag accessibility={accessibility} />
          </div>
          <div className="quest-list-item__location">
            <MapLocationIcon />
            <p>{location.name}</p>
          </div>
          <strong>
            {t('quest.dateTime.start', {
              date: formattedDate,
              time: formattedTime,
            })}
          </strong>
          <p>
            {t('quest.summary.participants', {
              current: properties.participants.length,
              expected: properties.expectedParticipants,
            })}
          </p>
        </div>
        <IoIosArrowDroprightCircle size={24} />
      </div>
      <Button
        type="button"
        id={properties.isCurrentUserRegisteredForQuest ? 'quit' : 'join'}
        value={properties.isCurrentUserRegisteredForQuest ? 'quit' : 'join'}
        style={
          properties.isCurrentUserRegisteredForQuest ? 'tertiary' : 'secondary'
        }
        label={t(
          `quest.cta.${
            properties.isCurrentUserRegisteredForQuest ? 'quit' : 'join'
          }`
        )}
        clickCallback={handleQuestCallback}
      />
    </Link>
  );
}

export default QuestListItem;
