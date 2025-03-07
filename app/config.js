export const LANGUAGE_ENGLISH = 'en';
export const LANGUAGE_FRENCH = 'fr';

export const DEFAULT_LANGUAGE = LANGUAGE_ENGLISH;

export const SUPPORTED_LANGUAGES = [LANGUAGE_ENGLISH, LANGUAGE_FRENCH];

export const COUNTRY_FRANCE = 'fr';
export const COUNTRY_BELGIUM = 'be';
export const DEFAULT_COUNTRY = COUNTRY_BELGIUM;

export const AVAILABLE_COUNTRIES = [COUNTRY_FRANCE, COUNTRY_BELGIUM];

export const firebaseErrorCodes = {
  password: 'password',
  email: 'Firebase: Error (auth/invalid-email).',
  location: 'location',
};

export const questEnvironment = ['city', 'sea', 'river', 'hike'];

export const questEquipment = ['boot', 'gloves', 'mask', 'bag'];

export const questAccessibility = [
  'wheelchair',
  'kids',
  'stairs',
  'slope',
  'road',
];
