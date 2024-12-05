import i18n from 'i18next';
import Backend from 'i18next-fs-backend/cjs'; // Use filesystem backend

let isInitialized = false;

if (!isInitialized) {
  i18n.use(Backend).init({
    backend: {
      loadPath: './public/locales/{{lng}}/{{ns}}.json', // Filesystem path for translations
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    defaultNS: 'translation',
    debug: true, // Enable debugging
  });
  isInitialized = true;
}

export default i18n;
