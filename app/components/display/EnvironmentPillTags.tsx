import { useTranslation } from 'react-i18next';
import PillTag from './PillTag';
import getIconForEnvironment from '~/utils/quests/getIconForEnvironment';
import { environmentOptions } from '~/config';

interface EnvironmentPillTagType {
  environment: Array<string>;
  isDetailed: boolean;
}

function EnvironmentPillTags({
  environment,
  isDetailed = false,
}: EnvironmentPillTagType) {
  const { t } = useTranslation();

  if (!isDetailed) {
    const isUrban = environment.includes('city');
    const SingleEnvIcon = getIconForEnvironment(isUrban ? 'city' : 'nature');

    return (
      <PillTag
        label={t(`quest.summary.${isUrban ? 'urban' : 'nature'}`)}
        icon={<SingleEnvIcon />}
      />
    );
  }

  return (
    <ul className="tags-list">
      {environment.map((env) => {
        const envOption = environmentOptions.find((e) => e.value === env);
        if (!envOption) return null;

        const Icon = getIconForEnvironment(env);
        return <PillTag key={env} label={t(envOption.label)} icon={<Icon />} />;
      })}
    </ul>
  );
}

export default EnvironmentPillTags;
