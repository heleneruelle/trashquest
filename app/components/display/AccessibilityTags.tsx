import { useTranslation } from 'react-i18next';
import PillTag from './PillTag';
import { accessibilityOptions } from '~/config';
import getIconForAccessibility from '~/utils/quests/getIconForAccessibility';

interface AccessibilityTagsType {
  accessibility: string[];
}

function AccessibilityTags({ accessibility }: AccessibilityTagsType) {
  const { t } = useTranslation();

  return (
    <div className="accessibility-tags">
      {accessibility.map((a) => {
        const Icon = getIconForAccessibility(a);
        return (
          <PillTag
            key={a}
            label={t(accessibilityOptions.find((e) => e.value === a)?.label)}
            icon={<Icon />}
          />
        );
      })}
    </div>
  );
}

export default AccessibilityTags;
