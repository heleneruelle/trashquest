import i18n from 'i18next';
import Backend from 'i18next-http-backend';

i18n.use(Backend).init({
  backend: {
    loadPath: './locales/{{lng}}/{{ns}}.json',
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'fr'],
  defaultNS: 'translation',
});

export default i18n;