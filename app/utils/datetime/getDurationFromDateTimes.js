function getDurationFromDateTimes({ startDateTime, endDateTime }) {
  const d1 = new Date(startDateTime);
  const d2 = new Date(endDateTime);
  const diffMillis = Math.abs(d2 - d1);
  const days = Math.floor(diffMillis / (24 * 3600 * 1000));
  const hours = Math.floor((diffMillis % (24 * 3600 * 1000)) / (3600 * 1000));
  const minutes = Math.floor((diffMillis % (3600 * 1000)) / (60 * 1000));

  const durationToPass = {
    ...(days > 0 ? { days } : {}),
    ...(hours > 0 ? { hours } : {}),
    ...(minutes > 0 ? { minutes } : {}),
  };

  return durationToPass;
}

export default getDurationFromDateTimes;
