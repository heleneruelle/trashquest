import { useTranslation } from 'react-i18next';
import PillTag from './PillTag';
import { TbMoodKid } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';

interface AccessibilityPillTagType {
  accessibility: Array<string>;
}

function AccessibilityPillTag({ accessibility }: AccessibilityPillTagType) {
  const { t } = useTranslation();

  const isKidsFriendly = accessibility.includes('kids');
  const isAccessible = accessibility.includes('wheelchair');
  const isHardToAccess =
    accessibility.filter((e) => e !== 'kids' && e !== 'wheelchair').length > 0;

  return (
    <>
      {isKidsFriendly && (
        <PillTag label={t('quest.summary.kids')} icon={<TbMoodKid />} />
      )}
      {isHardToAccess ||
        (isAccessible && (
          <PillTag
            label={t(
              `quest.summary.${isAccessible ? 'accessible' : 'non-accessible'}`
            )}
            icon={<IoAccessibility />}
          />
        ))}
    </>
  );
}

export default AccessibilityPillTag;
