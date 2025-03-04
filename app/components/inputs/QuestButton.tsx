import { useTranslation } from 'react-i18next';
import SwordIcon from '../icons/SwordIcon';

function QuestButton({ type }: { type: 'new' | 'start' }) {
  const { t } = useTranslation();
  return (
    <div className="quest-button">
      <div className="quest-button__icon">
        <SwordIcon size={30} />
      </div>
      <div className="quest-button__label">
        {t(`create-new-quest.cta.${type}`)}
      </div>
    </div>
  );
}

export default QuestButton;
