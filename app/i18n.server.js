import i18n from 'i18next';
import Backend from 'i18next-fs-backend/cjs'; // Important : Use filesystem backend
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './config';

let isInitialized = false;

if (!isInitialized) {
  i18n.use(Backend).init({
    backend: {
      loadPath: './public/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });
  isInitialized = true;
}

export default i18n;
