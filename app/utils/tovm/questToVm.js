function questToVm(quest, creator) {
  return {
    ...quest,
    creator,
    // TODO handle with current user
    isCurrentUserCreator: true,
  };
}

export default questToVm;
