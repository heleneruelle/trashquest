function questToVm(quest, creator) {
  const data = {
    ...quest,
    properties: {
      ...quest.properties,
      equipment: quest.properties.equipment.split(','),
      environment: quest.properties.environment.split(','),
      accessibility: quest.properties.accessibility.split(','),
    },
    creator,
  };
  return data;
}

export default questToVm;
