import { useTranslation } from 'react-i18next';
import ImageLayout from '~/components/templates/ImageLayout';

function Loading() {
  const { t } = useTranslation();

  return (
    <ImageLayout>
      <h1>{t('loading')}</h1>
    </ImageLayout>
  );
}

export default Loading;
