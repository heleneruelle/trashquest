import { CITY, SEA, RIVER, FOREST, MOUNTAIN, HIKE, NATURE } from '../../config';
import { FaMountain } from 'react-icons/fa';
import { TiWaves } from 'react-icons/ti';
import { MdLocationCity } from 'react-icons/md';
import { PiPersonSimpleHikeBold } from 'react-icons/pi';
import { MdForest } from 'react-icons/md';
import { MdWater } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineEmojiNature } from 'react-icons/md';

function getIconForEnvironment(value) {
  switch (value) {
    case CITY:
      return MdLocationCity;
    case SEA:
      return TiWaves;
    case RIVER:
      return MdWater;
    case FOREST:
      return MdForest;
    case MOUNTAIN:
      return FaMountain;
    case HIKE:
      return PiPersonSimpleHikeBold;
    case NATURE:
      return MdOutlineEmojiNature;
    default:
      return FaLocationDot;
  }
}

export default getIconForEnvironment;
