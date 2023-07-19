import { onUploadEsc } from './form.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

/**
 * функция, закрывающая окно с сообщением об успешной отправке формы по нажатию Esc.
 * предназначена для обработчика событий.
 */
const onSuccessEsc = (evt) => {
  const successWindow = document.querySelector('.success');
  if (evt.key === 'Escape') {
    evt.preventDefault();
    successWindow.remove();
    document.removeEventListener('keydown', onSuccessEsc);
  }
};

/**
 * функция, закрывающая окно с сообщением об ошибке отправки формы по нажатию Esc.
 * предназначена для обработчика событий.
 */
const onErrorEsc = (evt) => {
  const errorWindow = document.querySelector('.error');
  if (evt.key === 'Escape') {
    evt.preventDefault();
    errorWindow.remove();
    document.removeEventListener('keydown', onErrorEsc);
    document.addEventListener('keydown', onUploadEsc);
  }
};

/**
 * функция добавления сообщения об ошибке.
 * @param {string} error - сообщение об ошибке
 * @param {HTMLElement} element - Html элемент, в который нужно добавить сообщение об ошибке.
 */
const addError = (error, element) => {
  const message = document.createElement('p');
  message.textContent = error;
  element.append(message);
};

/**
 * функция создания окна с сообщением об успешной отправке формы.
 */
const createSuccessWindow = () => {
  const window = successTemplate.cloneNode(true);
  document.body.append(window);
  const successWindow = document.querySelector('.success');
  document.addEventListener('keydown', onSuccessEsc);
  successWindow.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')
      || evt.target.closest('.success__button')) {
      successWindow.remove();
      document.removeEventListener('keydown', onSuccessEsc);
    }
  });
};

/**
 * функция создания окна с сообщением об ошибке отправки формы.
 * @param {string} errorMessage - сообщение об ошибке.
 */
const createErrorWindow = (errorMessage) => {
  const window = errorTemplate.cloneNode(true);
  const inner = window.querySelector('.error__inner');
  addError(errorMessage, inner);
  document.body.append(window);
  document.removeEventListener('keydown', onUploadEsc);
  const errorWindow = document.querySelector('.error');
  document.addEventListener('keydown', onErrorEsc);
  errorWindow.addEventListener('click', (evt) => {
    if (evt.target.matches('.error')
      || evt.target.closest('.error__button')) {
      errorWindow.remove();
      document.removeEventListener('keydown', onErrorEsc);
      document.addEventListener('keydown', onUploadEsc);
    }
  });
};

export { addError, createSuccessWindow, createErrorWindow };
