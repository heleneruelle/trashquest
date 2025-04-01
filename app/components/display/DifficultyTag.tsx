import { useTranslation } from 'react-i18next';
import PillTag from './PillTag';
import { IoAccessibility } from 'react-icons/io5';

interface DifficultyTagType {
  accessLevel: number;
}

function getStyleForAccessLevel(accessLevel: number | undefined) {
  switch (accessLevel) {
    case 3:
      return 'negative';
    case 2:
      return 'middle';
    case 1:
      return 'positive';
    default:
      return 'unkown';
  }
}

function DifficultyTag({ accessLevel }: DifficultyTagType) {
  const { t } = useTranslation();

  return (
    <PillTag
      icon={<IoAccessibility />}
      label={t(`quest.summary.access.${accessLevel}`)}
      style={getStyleForAccessLevel(accessLevel)}
    />
  );
}

export default DifficultyTag;
