function timeToHHMM(date) {
  return date.toTimeString().split(' ')[0].slice(0, 5);
}

export default timeToHHMM;
