import { accessLevels } from '../../config';

function getAccessibilityLevel(access) {
  if (access.elevation || access.blocker) {
    return accessLevels.hard;
  } else if (access.limited_access || !access.kids || !access.wheelchair) {
    return accessLevels.intermediate;
  } else if (access.full_path || access.wheelchair || access.kids) {
    return accessLevels.easy;
  } else {
    return accessLevels.unknown;
  }
}

export default getAccessibilityLevel;
