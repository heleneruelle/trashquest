import { useLoaderData, useParams, useFetcher } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { useTranslation, Trans } from 'react-i18next';
import { useState } from 'react';
import QuestType from '~/types/quest';
import FieldWithChild from '~/components/display/FieldWithChild';
import EquipmentPillTags from '~/components/display/EquipmentPillTags';
import AccessibilityTags from '~/components/display/AccessibilityTags';
import DifficultyTag from '~/components/display/DifficultyTag';
import EnvironmentPillTags from '~/components/display/EnvironmentPillTags';
import PillTag from '~/components/display/PillTag';
import Toast from '~/components/notifications/Toast';
import QuestLocation from '~/components/display/quest/QuestLocation';
import SingleQuestCTAs from '~/components/display/quest/SingleQuestCTAs';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { FaDragon } from 'react-icons/fa';
import { MdTimer } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';
import { RiArrowGoBackLine } from 'react-icons/ri';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import asyncJoinQuest from '~/utils/quests/asyncJoinQuest';
import asyncQuitQuest from '~/utils/quests/asyncQuitQuest';
import i18n from '~/i18n';

interface LoaderData {
  success: boolean;
  quest: QuestType;
  questAsset: string;
}

function getHRDuration(duration) {
  const { days, hours, minutes } = duration;
  const parts = [];

  if (days) {
    parts.push(i18n.t(`days_${days === 1 ? 'one' : 'other'}`, { count: days }));
  }

  if (hours) {
    parts.push(
      i18n.t(`hours_${hours === 1 ? 'one' : 'other'}`, { count: hours })
    );
  }

  if (minutes) {
    parts.push(
      i18n.t(`minutes_${minutes === 1 ? 'one' : 'other'}`, { count: minutes })
    );
  }

  return parts.join(', ');
}

function Quest() {
  const data = useLoaderData<LoaderData>();
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  if (!data?.success || !data?.quest) {
    /* TODO error handling */
    return <div>{t('quest.error.title')}</div>;
  }

  const { id } = useParams();
  const questFetcher = useFetcher();

  const { quest } = data || {};
  const { properties, creator } = quest || {};

  const {
    isCurrentUserRegisteredForQuest,
    isCurrentUserCreator,
    formattedDateTime,
    isPast,
    accessibility,
    downloadUrl,
  } = properties;

  async function handleJoinQuest(e: Event) {
    e.preventDefault();
    try {
      const data = await asyncJoinQuest({ id });
      questFetcher.load('/api/quest');
      if (data.error) {
        setError(true);
        return;
      }
    } catch (error) {
      setError(true);
    }
  }

  async function handleQuitQuest(e: Event) {
    e.preventDefault();
    try {
      const data = await asyncQuitQuest({ id });
      questFetcher.load('/api/quest');

      if (data.error) {
        setError(true);
        return;
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="quests-container single-quest-container">
      {error && (
        <Toast
          type="error"
          message={t('quest.error.join')}
          callback={() => setError(false)}
        />
      )}
      <img className="single-quest__banner" src={downloadUrl} />
      {isCurrentUserRegisteredForQuest && !isCurrentUserCreator && (
        <div className="single-quest__registered">
          <PillTag
            icon={<FaDragon />}
            label={t('quest.joined')}
            style="positive"
          />
        </div>
      )}
      <div className="single-quest__header">
        <div className="single-quest__start">
          <strong className={`${isPast && 'single-quest__start__past'}`}>
            {t('quest.dateTime.start', {
              date: formattedDateTime.start[i18n.language].date,
              time: formattedDateTime.start[i18n.language].time,
            })}
          </strong>
          {isPast ? (
            <PillTag
              icon={<RiArrowGoBackLine />}
              label={t('quest.dateTime.past')}
              style="negative"
            />
          ) : null}
        </div>
        <div className="single-quest__title">
          <h1>{properties.name}</h1>
          <DifficultyTag accessLevel={properties.accessLevel} />
        </div>
        <QuestLocation quest={quest} />
        <SingleQuestCTAs
          quest={quest}
          handleJoinQuest={handleJoinQuest}
          handleQuitQuest={handleQuitQuest}
        />
        <hr className="single-quest__separator"></hr>
        <div className="single-quest__details">
          <p>{properties.description}</p>
          <div className="single-quest__field">
            <IoPerson size={24} />
            <Trans
              i18nKey="quest.organiser"
              values={{ name: creator.username }}
              components={[
                <Link to={createCompositeUrl(i18n, `/user/${creator.id}`)} />,
              ]}
            />
          </div>
          <div className="single-quest__field">
            <MdTimer size={24} />
            <span>
              {t('quest.duration', {
                duration: getHRDuration(properties.duration),
              })}
            </span>
          </div>
          <div className="single-quest__field">
            <HiMiniUserGroup size={24} />
            <span>
              {t('quest.summary.participants', {
                current: properties.participants.length,
                expected: properties.expectedParticipants,
              })}
            </span>
          </div>
          <FieldWithChild fieldName={t('quest.equipment')} id="equipment">
            <EquipmentPillTags equipment={properties.equipment} isDetailed />
          </FieldWithChild>
          <FieldWithChild fieldName={t('quest.environment')} id="environment">
            <EnvironmentPillTags
              environment={properties.environment}
              isDetailed
            />
          </FieldWithChild>
          {accessibility?.length ? (
            <FieldWithChild
              fieldName={t('quest.accessibility')}
              id="accessibility"
            >
              <AccessibilityTags accessibility={accessibility} />
            </FieldWithChild>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Quest;
