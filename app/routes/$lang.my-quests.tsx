import { LinksFunction } from '@remix-run/node';
import MyQuests from '~/pages/MyQuests';
import myQuestsLoader from '~/loaders/myQuest';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/styles/form.css' },
    { rel: 'stylesheet', href: '/styles/quests.css' },
  ];
};

export const loader = myQuestsLoader;

export default MyQuests;
