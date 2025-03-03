import { useTranslation } from 'react-i18next';
import PillTag from './PillTag';
import SwordIcon from '../icons/SwordIcon';
import HandSparkleIcon from '../icons/HandSparkleIcon';

interface EquipmentPillTagType {
  equipment: Array<string>;
}

function EquipmentPillTag({ equipment }: EquipmentPillTagType) {
  const { t } = useTranslation();

  return (
    <PillTag
      label={t(
        `quest.summary.${equipment?.length > 0 ? 'equipment' : 'no-equipment'}`
      )}
      icon={equipment?.length > 0 ? <SwordIcon /> : <HandSparkleIcon />}
      style={equipment?.length === 0 ? 'positive' : ''}
    />
  );
}

export default EquipmentPillTag;
