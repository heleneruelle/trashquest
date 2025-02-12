/**
 * Filter quest if matching environment, equipment and accessibility parameters
 * @param {object} quest - Provide a complete quest obj
 * @param {string|null} environment - Include all environment for which you want to the quest to be a match. If null the function will consider this filter to be true.
 * @param {string|null} equipment - Include all equipment for which you want to the quest to be a match. If null the function will consider this filter to be true.
 * @param {string|null} accessibility - Include all accessibility for which you want to the quest to be a match. If null the function will consider this filter to be true.
 * @returns {boolean} Boolean, if quest matches all parameters
 */
function filterQuest(quest, environment, equipment, accessibility) {
  const matchesEnvironment = environment
    ? environment
        .split(',')
        .some((e) => quest.properties.environment.includes(e))
    : true;

  const matchesEquipment = equipment
    ? equipment.split(',').some((e) => quest.properties.equipment.includes(e))
    : true;

  const matchesAccessibility = accessibility
    ? accessibility
        .split(',')
        .some((a) => quest.properties.accessibility.includes(a))
    : true;

  return matchesEnvironment && matchesEquipment && matchesAccessibility;
}

export default filterQuest;
