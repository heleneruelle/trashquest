import { useLoaderData, useParams, useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import QuestType from '~/types/quest';
import FieldWithChild from '~/components/display/FieldWithChild';
import EquipmentPillTag from '~/components/display/EquipmentPillTag';
import AccessibilityPillTag from '~/components/display/AccessibilityPillTag';
import EnvironmentPillTag from '~/components/display/EnvironmentPillTag copy';
import PillTag from '~/components/display/PillTag';
import Button from '~/components/inputs/Button';
import Toast from '~/components/notifications/Toast';
import QuestLocation from '~/components/display/quest/QuestLocation';
import ButtonLink from '~/components/inputs/ButtonLink';
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
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  if (!data?.success || !data?.quest) {
    /* TODO error handling */
    return <div>{t('quest.error.title')}</div>;
  }

  const { id } = useParams();
  const questFetcher = useFetcher();

  const { quest, questAsset } = data || {};
  const { properties, creator } = quest || {};

  const {
    isCurrentUserRegisteredForQuest,
    isCurrentUserCreator,
    isQuestFull,
    formattedDateTime,
    isPast,
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

  const copyToClipboard = () => {
    if (typeof window === 'undefined' || !navigator.clipboard) {
      console.error('Clipboard API non disponible');
      return;
    }

    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Erreur lors de la copie :', err));
  };

  return (
    <div className="quests-container single-quest-container">
      {error && (
        <Toast
          type="error"
          message={t('quest.error.join')}
          callback={() => setError(false)}
        />
      )}
      <img className="single-quest__banner" src={questAsset} />
      <div className="single-quest__header">
        <div className="single-quest__start">
          <strong className={`${isPast && 'single-quest__start__past'}`}>
            {t('quest.dateTime.start', {
              date: formattedDateTime.start[i18n.language].date,
              time: formattedDateTime.start[i18n.language].time,
            })}
          </strong>
          <PillTag
            icon={<RiArrowGoBackLine />}
            label={t('quest.dateTime.past')}
            style="negative"
          />
        </div>
        <div className="single-quest__title">
          <h1>{properties.name}</h1>
          {isCurrentUserRegisteredForQuest && !isCurrentUserCreator && (
            <PillTag
              icon={<FaDragon />}
              label={t('quest.joined')}
              style="positive"
            />
          )}
        </div>
        <QuestLocation quest={quest} />
        <div className="single-quest__ctas">
          <Button
            type="button"
            label={t(`quest.cta.url-${copied ? 'copied' : 'copy'}`)}
            clickCallback={copyToClipboard}
          />
          {!isCurrentUserCreator &&
            !isQuestFull &&
            !isCurrentUserRegisteredForQuest &&
            !isPast && (
              <Button
                type="button"
                label={t('quest.cta.join')}
                clickCallback={handleJoinQuest}
              />
            )}
          {!isCurrentUserCreator &&
            isCurrentUserRegisteredForQuest &&
            !isPast && (
              <Button
                type="button"
                label={t('quest.cta.quit')}
                clickCallback={handleQuitQuest}
              />
            )}
          <ButtonLink
            label={t(`create-new-quest.cta.new`)}
            target={createCompositeUrl(i18n, '/create-new')}
          />
        </div>
        <hr className="single-quest__separator"></hr>
        <div className="single-quest__details">
          <p>{properties.description}</p>
          <div className="single-quest__field">
            <IoPerson size={24} />
            <span>{t('quest.organiser', { name: creator.username })}</span>
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
            <EquipmentPillTag equipment={properties.equipment} />
          </FieldWithChild>
          <FieldWithChild fieldName={t('quest.environment')} id="environment">
            <EnvironmentPillTag environment={properties.environment} />
          </FieldWithChild>
            <FieldWithChild fieldName={t('quest.difficulty')} id="difficulty">
              <AccessibilityPillTag accessLevel={properties.accessLevel} />
            </FieldWithChild>
        </div>
      </div>
    </div>
  );
}

export default Quest;
