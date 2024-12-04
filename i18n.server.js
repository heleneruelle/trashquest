import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './app/config';

i18n.use(Backend).init({
  backend: {
    loadPath: './locales/{{lng}}/{{ns}}.json',
  },
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  defaultNS: 'translation',
});

export default i18n;
