import { createElements } from './pictureList.js';
import { onUploadEsc } from './form.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const photos = [];

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

/**
 * функция, переносящая данные фотографий с сервера в массив photos.
 * @param {Array} data - массив данных.
 * @returns массив photos.
 */
const createPhotos = (data) => {
  for (let i = 0; i < data.length; i++) {
    photos.push(data[i]);
  }
  return photos;
};

/**
 * функция отображения фотографий, полученных с сервера.
 * @param {HTMLElement} element - Html элемент, в котором нужно отобразить фотографии.
 */
const getPictures = (element) => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`При получении данных с сервера произошла ошибка. Код ошибки: ${response.status}`);
    })
    .then((data) => {
      createElements(data, element);
      createPhotos(data);
    })
    .catch((err) => {
      addError(err, element);
    });
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
 * функция отправки данных формы на сервер.
 * @param {FormData} data - переменная в которой записана FormData отправляемой формы.
 * @param {function} onSuccess - функция, закрывающая окно формы.
 * @param {HTMLElement} button - кнопка отправки формы.
 */
const sendImageForm = (data, onSuccess, button) => {
  blockSubmitButton(button);
  fetch('https://29.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`При отправке данных на сервер произошла ошибка. Код ошибки: ${response.status}`);
      }
    })
    .then(() => {
      onSuccess();
      createSuccessWindow();
    })
    .catch((err) => {
      createErrorWindow(err);
    })
    .finally(() => {
      unblockSubmitButton(button);
    });
};

export { photos, getPictures, sendImageForm };
