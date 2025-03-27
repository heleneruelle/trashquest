export const LANGUAGE_ENGLISH = 'en';
export const LANGUAGE_FRENCH = 'fr';

export const DEFAULT_LANGUAGE = LANGUAGE_FRENCH;

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

export const PARTICIPANT = 'going';
export const HOST = 'host';
export const PAST = 'past';

export const FULL_PATH = 'full_path';
export const LIMITED_PATH = 'limited_path';
export const WHEELCHAIR = 'wheelchair';
export const KIDS = 'kids';
export const ELEVATION = 'elevation';
export const BLOCKER = 'blocker';

export const accessibilityOptions = [
  { value: FULL_PATH, label: `quest.parameters.accessibility.${FULL_PATH}` },
  {
    value: LIMITED_PATH,
    label: `quest.parameters.accessibility.${LIMITED_PATH}`,
  },
  { value: WHEELCHAIR, label: `quest.parameters.accessibility.${WHEELCHAIR}` },
  { value: KIDS, label: `quest.parameters.accessibility.${KIDS}` },
  { value: ELEVATION, label: `quest.parameters.accessibility.${ELEVATION}` },
  { value: BLOCKER, label: `quest.parameters.accessibility.${BLOCKER}` },
];

export const accessLevels = {
  hard: 3,
  intermediate: 2,
  easy: 1,
  unknown: 0,
};

const access = [FULL_PATH, LIMITED_PATH, WHEELCHAIR, KIDS, ELEVATION, BLOCKER];
