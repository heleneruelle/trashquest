function dateTimeStartEndValidation(startDate, endDate, startTime, endTime) {
  const isoStartDatetime = new Date(
    `${startDate}T${startTime}:00Z`
  ).toISOString();
  const isoEndDatetime = new Date(`${endDate}T${endTime}:00Z`).toISOString();
  if (
    isoStartDatetime === isoEndDatetime ||
    isoStartDatetime > isoEndDatetime
  ) {
    return false;
  }
  return true;
}

export default dateTimeStartEndValidation;
