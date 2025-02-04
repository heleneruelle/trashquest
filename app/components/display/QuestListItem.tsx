import { Link } from '@remix-run/react';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';
import QuestType from '~/types/quest';

interface QuestListItemType {
  quest: QuestType;
}

function QuestListItem({ quest }: QuestListItemType) {
  const { id, properties } = quest;
  return (
    <Link to={createCompositeUrl(i18n, `/quest/${id}`)}>{properties.name}</Link>
  );
}

export default QuestListItem;
