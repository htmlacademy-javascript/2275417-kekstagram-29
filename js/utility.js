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

const closeWindow = (element) => {
  document.body.classList.remove('modal-open');
  element.classList.add('hidden');
};

const openWindow = (element) => {
  document.body.classList.add('modal-open');
  element.classList.remove('hidden');
};

const checkNoRepeatedElement = (array) => {
  const previousValues = [];
  const repeatedValues = [];
  let value = true;
  array.forEach((element) => {
    if (!previousValues.includes(element)) {
      previousValues.push(element);
    } else {
      repeatedValues.push(element);
    }
    value = repeatedValues.length === 0;
  });
  return value;
};

export { getRandomInteger, getNewId, closeWindow, openWindow, checkNoRepeatedElement };
