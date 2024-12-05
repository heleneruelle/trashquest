import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json', // Matches public folder structure
      },
      fallbackLng: 'en', // Default language
      supportedLngs: ['en', 'fr'], // Only allow these languages
      defaultNS: 'translation', // Default namespace
      debug: true, // Debug for troubleshooting
    });
}

export default i18n;
