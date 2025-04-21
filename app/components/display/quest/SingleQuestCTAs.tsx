import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '~/components/inputs/Button';
import ButtonLink from '~/components/inputs/ButtonLink';
import { FaRegCopy } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import QuestType from '~/types/quest';

interface Props {
  quest: QuestType;
  handleJoinQuest: (e: Event) => Promise<void>;
  handleQuitQuest: (e: Event) => Promise<void>;
}

function SingleQuestCTAs({ handleJoinQuest, handleQuitQuest, quest }: Props) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const { properties } = quest || {};

  const {
    isCurrentUserRegisteredForQuest,
    isCurrentUserCreator,
    isQuestFull,
    isPast,
  } = properties;

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
    <div className="single-quest__ctas">
      <Button type="button" clickCallback={copyToClipboard} id="copy-quest">
        <FaRegCopy />
        {t(`quest.cta.url-${copied ? 'copied' : 'copy'}`)}
      </Button>
      {!isCurrentUserCreator &&
        !isQuestFull &&
        !isCurrentUserRegisteredForQuest &&
        !isPast && (
          <Button type="button" clickCallback={handleJoinQuest} id="join-quest">
            <FaCircleCheck />
            {t('quest.cta.join')}
          </Button>
        )}
      {!isCurrentUserCreator && isCurrentUserRegisteredForQuest && !isPast && (
        <Button type="button" clickCallback={handleQuitQuest} id="quit-quest">
          <FaPlus style={{ transform: 'rotate(45deg)' }} />
          {t('quest.cta.quit')}
        </Button>
      )}
      <ButtonLink target={createCompositeUrl(i18n, '/create-new')}>
        <FaPlus />
        {t(`quest.cta.create`)}
      </ButtonLink>
    </div>
  );
}

export default SingleQuestCTAs;
