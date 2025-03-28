import { useTranslation } from 'react-i18next';
import { MdOutlineEmojiNature } from 'react-icons/md';
import { MdLocationCity } from 'react-icons/md';
import PillTag from './PillTag';

interface EnvironmentPillTagType {
  environment: Array<string>;
}

function EnvironmentPillTags({ environment }: EnvironmentPillTagType) {
  const { t } = useTranslation();

  const isUrban = environment.includes('city');

  return (
    <PillTag
      label={t(`quest.summary.${isUrban ? 'urban' : 'nature'}`)}
      icon={isUrban ? <MdLocationCity /> : <MdOutlineEmojiNature />}
      //style={isUrban ? 'positive' : ''}
    />
  );
}

export default EnvironmentPillTags;
