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

export const environmentOptions = [
  { value: 'city', label: 'quest.parameters.environment.city' },
  { value: 'sea', label: 'quest.parameters.environment.sea' },
  { value: 'river', label: 'quest.parameters.environment.river' },
  { value: 'hike', label: 'quest.parameters.environment.hike' },
];

export const questEquipment = ['boot', 'gloves', 'mask', 'bag'];

export const equipmentOptions = [
  { value: 'boot', label: 'quest.parameters.equipment.boot' },
  { value: 'gloves', label: 'quest.parameters.equipment.gloves' },
  { value: 'mask', label: 'quest.parameters.equipment.mask' },
  { value: 'bag', label: 'quest.parameters.equipment.bag' },
];

export const questAccessibility = [
  'wheelchair',
  'kids',
  'stairs',
  'slope',
  'road',
];

export const accessibilityOptions = [
  { value: 'wheelchair', label: 'quest.parameters.accessibility.wheelchair' },
  { value: 'kids', label: 'quest.parameters.accessibility.kids' },
  { value: 'stairs', label: 'quest.parameters.accessibility.stairs' },
  { value: 'slope', label: 'quest.parameters.accessibility.slope' },
  { value: 'road', label: 'quest.parameters.accessibility.road' },
];
