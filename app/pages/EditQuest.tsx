import { useParams } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import ButtonLink from '~/components/inputs/ButtonLink';
import createCompositeUrl from '~/utils/url/createCompositeUrl';
import i18n from '~/i18n';

function EditQuest() {
  const { id } = useParams();
  const { t } = useTranslation();
  return (
    <div>
      Edit quest
      <ButtonLink target={createCompositeUrl(i18n, `quest/${id}`)}>
        {t('quit')}
      </ButtonLink>
    </div>
  );
}

export default EditQuest;
