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
const checkNoRepeatedElement = (array) => array.length === new Set(array).size;

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

/**
 * функция, делающая кнопку отправки формы неактивной.
 * @param {HTMLElement} button - кнопка, которую нужно заблокировать.
 */
const blockSubmitButton = (button) => {
  button.disabled = true;
  button.textContent = 'Отправка...';
};

/**
 * функция, возвращающая кнопке отправки формы активное состояние.
 * @param {HTMLElement} button - кнопка, которую нужно разблокировать.
 */
const unblockSubmitButton = (button) => {
  button.disabled = false;
  button.textContent = 'Опубликовать';
};

/**
 * функция добавления сообщения об ошибке.
 * @param {string} error - сообщение об ошибке
 * @param {HTMLElement} element - Html элемент, в который нужно добавить сообщение об ошибке.
 */
const addError = (error, element = null) => {
  const message = document.createElement('p');
  message.textContent = error;
  if (element !== null) {
    element.append(message);
  }
};

const showAlert = (errorMessage) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.textAlign = 'center';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.lineHeight = '100%';
  alert.style.backgroundColor = '#ff4c4c';
  alert.textContent = errorMessage;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, '5000');
};

const changeEvents = (element, onCloseEvents, onOpenEvents) => {
  if (element.classList.contains('hidden')) {
    onCloseEvents();
    return;
  }
  onOpenEvents();
};

/**
 * функция для настройки mutationObserver на смену классов
 */
const observeClassChange = (mutationList, inputFunction) => {
  mutationList.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      inputFunction();
    }
  });
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const removeElements = (element) => {
  element.forEach((item) => item.remove());
};

export { closeWindow, openWindow, checkNoRepeatedElement, splitArray, blockSubmitButton, unblockSubmitButton, addError, showAlert, changeEvents, observeClassChange, debounce, removeElements };
