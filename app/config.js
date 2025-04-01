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

export const CITY = 'city';
export const SEA = 'sea';
export const RIVER = 'river';
export const FOREST = 'forest';
export const MOUNTAIN = 'mountain';
export const HIKE = 'hike';
export const NATURE = 'nature';

export const questEnvironment = [CITY, SEA, RIVER, FOREST, MOUNTAIN, HIKE];

export const environmentOptions = [
  { value: CITY, label: `quest.parameters.environment.${CITY}` },
  { value: SEA, label: `quest.parameters.environment.${SEA}` },
  { value: RIVER, label: `quest.parameters.environment.${RIVER}` },
  { value: FOREST, label: `quest.parameters.environment.${FOREST}` },
  { value: MOUNTAIN, label: `quest.parameters.environment.${MOUNTAIN}` },
  { value: HIKE, label: `quest.parameters.environment.${HIKE}` },
];

export const BOOT = 'boot';
export const GLOVES = 'gloves';
export const MASK = 'mask';
export const BAG = 'bag';

export const equipmentOptions = [
  { value: BOOT, label: `quest.parameters.equipment.${BOOT}` },
  { value: GLOVES, label: `quest.parameters.equipment.${GLOVES}` },
  { value: MASK, label: `quest.parameters.equipment.${MASK}` },
  { value: BAG, label: `quest.parameters.equipment.${BAG}` },
];

export const questEquipment = [BOOT, GLOVES, MASK, BAG];

export const difficultyOptions = [
  { value: '3', label: 'quest.parameters.difficulty.3' },
  { value: '2', label: 'quest.parameters.difficulty.2' },
  { value: '1', label: 'quest.parameters.difficulty.1' },
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
