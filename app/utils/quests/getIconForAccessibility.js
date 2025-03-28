import { TbMoodKid } from 'react-icons/tb';
import { FaWheelchair } from 'react-icons/fa6';
import { FaMountain } from 'react-icons/fa';
import { MdOutlineBlock } from 'react-icons/md';
import { PiPathBold } from 'react-icons/pi';
import { RiLeafFill } from 'react-icons/ri';
import { IoAccessibility } from 'react-icons/io5';

import {
  FULL_PATH,
  LIMITED_PATH,
  WHEELCHAIR,
  KIDS,
  ELEVATION,
  BLOCKER,
} from '../../config';

function getIconForAccessibility(value) {
  switch (value) {
    case FULL_PATH:
      return PiPathBold;
    case LIMITED_PATH:
      return RiLeafFill;
    case WHEELCHAIR:
      return FaWheelchair;
    case KIDS:
      return TbMoodKid;
    case ELEVATION:
      return FaMountain;
    case BLOCKER:
      return MdOutlineBlock;
    default:
      return IoAccessibility;
  }
}

export default getIconForAccessibility;
