function dateTimeToISODatetime({ date, time }) {
  return new Date(`${date}T${time}:00Z`).toISOString();
}

export default dateTimeToISODatetime;
