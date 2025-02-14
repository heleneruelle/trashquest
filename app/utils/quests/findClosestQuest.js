import { point, distance } from '@turf/turf';

async function findClosestQuest({ lat, lon }, quests) {
  try {
    const closestQuest = quests.reduce((closestQuest, quest) => {
      const questLat = quest.location.coordinates._latitude;
      const questLon = quest.location.coordinates._longitude;

      const userPoint = point([lon, lat]);

      const questPoint = point([questLon, questLat]);

      const dist = distance(userPoint, questPoint, {
        units: 'kilometers',
      });

      if (!closestQuest || dist < closestQuest.dist) {
        return { ...quest, dist };
      }

      return closestQuest;
    }, null);
    return closestQuest;
  } catch (err) {
    throw new Error(`Error while parsing closest quest : ${err}`);
  }
}

export default findClosestQuest;
