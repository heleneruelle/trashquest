import { useTranslation } from 'react-i18next';
import { LinksFunction } from '@remix-run/node';
import QuestForm from '~/components/forms/QuestForm';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/createNew.css' },
    { rel: 'stylesheet', href: '/styles/quests.css' },
  ];
};

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="create-new-form">
      <h1>{t('create-new-quest.title')}</h1>
      <QuestForm />
    </div>
  );
}
