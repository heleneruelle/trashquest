import { Link, useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Button from '../inputs/Button';
import EquipmentPillTag from './EquipmentPillTag';
import EnvironmentPillTag from './EnvironmentPillTag copy';
import AccessibilityPillTag from './AccessibilityPillTag';
import QuestLocation from './quest/QuestLocation';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import asyncJoinQuest from '~/utils/quests/asyncJoinQuest';
import asyncQuitQuest from '~/utils/quests/asyncQuitQuest';
import asyncCancelQuest from '~/utils/quests/asyncCancelQuest';
import TagTitle from './TagTitle';
import i18n from '~/i18n';
import QuestType from '~/types/quest';

interface QuestListItemType {
  quest: QuestType;
}

function QuestListItem({ quest }: QuestListItemType) {
  const { id, properties } = quest;

  const { t } = useTranslation();
  const questFetcher = useFetcher();

  const {
    equipment,
    environment,
    accessibility,
    accessLevel,
    isCurrentUserCreator,
    formattedDateTime,
    isClosest,
    isPast,
  } = properties;

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

  async function handleCancelQuest(e: Event) {
    e.preventDefault();
    const cancelData = await asyncCancelQuest({ id: e.target?.value });
    // TODO : error handling on data
    if (cancelData.success) {
      questFetcher.load('/api/quests');
    }
  }

  return (
    <Link
      to={createCompositeUrl(i18n, `/quest/${id}`)}
      className="quest-list-item"
    >
      <img src={quest.bannerUrl} style={{ height: '100px', width: '100%' }} />
      <div className="quest-list-item__container">
        <div className="quest-list-item__title">
          <h4>{properties.name}</h4>
        </div>
        <div className="quest-list-item__properties-list">
          {isClosest ? <TagTitle title={t('quests.closest')} isBest /> : null}
          <EquipmentPillTag equipment={equipment} />
          <EnvironmentPillTag environment={environment} />
          <AccessibilityPillTag accessLevel={accessLevel} />
        </div>
        <QuestLocation quest={quest} />
        <strong>
          {t('quest.dateTime.start', {
            date: formattedDateTime.start[i18n.language].date,
            time: formattedDateTime.start[i18n.language].time,
          })}
        </strong>
        <p>
          {t('quest.summary.participants', {
            current: properties.participants.length,
            expected: properties.expectedParticipants,
          })}
        </p>
      </div>
      <div className="quest-list-item__footer">
        <div className="quest-list-item__footer-details">
          <span>{t('quest.cta.details')}</span>
          <MdOutlineKeyboardArrowRight size={16} />
        </div>
        {!isPast && (
          <>
            {isCurrentUserCreator ? (
              <Button
                id={quest.id}
                value={quest.id}
                type="button"
                clickCallback={handleCancelQuest}
                label="Cancel quest"
              />
            ) : (
              <Button
                type="button"
                id={
                  properties.isCurrentUserRegisteredForQuest ? 'quit' : 'join'
                }
                value={
                  properties.isCurrentUserRegisteredForQuest ? 'quit' : 'join'
                }
                style={
                  properties.isCurrentUserRegisteredForQuest
                    ? 'tertiary'
                    : 'secondary'
                }
                label={t(
                  `quest.cta.${
                    properties.isCurrentUserRegisteredForQuest ? 'quit' : 'join'
                  }`
                )}
                clickCallback={handleQuestCallback}
              />
            )}
          </>
        )}
      </div>
    </Link>
  );
}

export default QuestListItem;
