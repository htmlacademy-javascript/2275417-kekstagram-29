function getRandomInteger(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function getNewId(max) {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    if (lastGeneratedId > max) {
      return null;
    }
    return lastGeneratedId;
  };
}

export { getRandomInteger, getNewId };
