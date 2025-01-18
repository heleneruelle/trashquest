import { useTranslation } from 'react-i18next';
import { LinksFunction } from '@remix-run/node';
import TwoColumnsLayout from '~/components/templates/TwoColumnsLayout';
import ImageLayout from '~/components/templates/ImageLayout';
import QuestForm from '~/components/forms/QuestForm';
import createQuestAction from '~/loaders/createQuest';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/createNew.css' },
  ];
};

export { createQuestAction as action };

export default function Index() {
  const { t } = useTranslation();

  return (
    <TwoColumnsLayout>
      <div className="create-new-form">
        <h1>{t('create-new-quest.title')}</h1>
        <QuestForm />
      </div>
      <ImageLayout />
    </TwoColumnsLayout>
  );
}
