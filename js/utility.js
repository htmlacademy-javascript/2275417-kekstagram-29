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

/**
 * функция закрытия модальных окон. убирает класс modal-open у body,
 * ставит класс hidden на заданный элемент.
 */
const closeWindow = (element) => {
  document.body.classList.remove('modal-open');
  element.classList.add('hidden');
};

/**
 * функция открытия модальных окон. ставит класс modal-open на body,
 * убирает класс hidden у заданного элемента.
 */
const openWindow = (element) => {
  document.body.classList.add('modal-open');
  element.classList.remove('hidden');
};
/**
 * функция для проверки наличия в массиве повторяющихся элементов.
 * @returns boolean
 */
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
/**
 * функция для превращения строки в массив. исключает пустые элементы.
 * @param {string} string - строка, которую нужно разделить на элементы массива.
 * @param {string} method - формат отделения разных элементов.
 * @returns array
 */
const splitArray = (string, method) => {
  const hashtags = string.split(method);
  const hashtagsArray = hashtags.filter((element) => element !== '');
  return hashtagsArray;
};

export { getRandomInteger, getNewId, closeWindow, openWindow, checkNoRepeatedElement, splitArray };
