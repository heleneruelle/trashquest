import { GiRubberBoot } from 'react-icons/gi';
import { GiGloves } from 'react-icons/gi';
import { MdOutlineMasks } from 'react-icons/md';
import { TbMoneybag } from 'react-icons/tb';

import SwordIcon from '../../components/icons/SwordIcon';

import { BOOT, GLOVES, MASK, BAG } from '../../config';

function getIconForEquipment(value) {
  switch (value) {
    case BOOT:
      return GiRubberBoot;
    case GLOVES:
      return GiGloves;
    case MASK:
      return MdOutlineMasks;
    case BAG:
      return TbMoneybag;
    default:
      return SwordIcon;
  }
}

export default getIconForEquipment;
