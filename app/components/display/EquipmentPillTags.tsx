import { useTranslation } from 'react-i18next';
import PillTag from './PillTag';
import getIconForEquipment from '~/utils/quests/getIconForEquipment';
import { equipmentOptions } from '~/config';
import HandSparkleIcon from '../icons/HandSparkleIcon';
import SwordIcon from '../icons/SwordIcon';

interface EquipmentPillTagsProps {
  equipment: string[];
  isDetailed?: boolean;
}

function EquipmentPillTags({
  equipment,
  isDetailed = false,
}: EquipmentPillTagsProps) {
  const { t } = useTranslation();

  if (!isDetailed) {
    return (
      <div className="accessibility-tags">
        {equipment.length > 0 ? (
          <PillTag label={t('quest.summary.equipment')} icon={<SwordIcon />} />
        ) : (
          <PillTag
            label={t('quest.summary.no-equipment')}
            icon={<HandSparkleIcon />}
            style="positive"
          />
        )}
      </div>
    );
  }

  return (
    <div className="accessibility-tags">
      {equipment.length > 0 ? (
        equipment.map((item) => {
          const equipmentOption = equipmentOptions.find(
            (e) => e.value === item
          );
          if (!equipmentOption) return null;

          const Icon = getIconForEquipment(item);
          return (
            <PillTag
              key={item}
              label={t(equipmentOption.label)}
              icon={<Icon />}
            />
          );
        })
      ) : (
        <PillTag
          label={t('quest.summary.no-equipment')}
          icon={<HandSparkleIcon />}
          style="positive"
        />
      )}
    </div>
  );
}

export default EquipmentPillTags;
