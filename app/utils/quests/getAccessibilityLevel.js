import {
  FULL_PATH,
  LIMITED_PATH,
  KIDS,
  ELEVATION,
  BLOCKER,
  WHEELCHAIR,
  accessLevels,
} from '../../config';

function getAccessibilityLevel(access) {
  if (access.includes(FULL_PATH || BLOCKER)) {
    return accessLevels.hard;
  } else if (access.includes(LIMITED_PATH)) {
    return accessLevels.intermediate;
  } else if (access.includes(FULL_PATH || WHEELCHAIR || KIDS)) {
    return accessLevels.easy;
  } else {
    return accessLevels.unknown;
  }
}

export default getAccessibilityLevel;
