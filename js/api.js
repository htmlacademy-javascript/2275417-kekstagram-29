import { blockSubmitButton, unblockSubmitButton } from './utility.js';

const URL = {
  Recieve: 'https://29.javascript.pages.academy/kekstagram/data',
  Send: 'https://29.javascript.pages.academy/kekstagram',
};

/**
 * функция отображения фотографий, полученных с сервера.
 * @param {HTMLElement} element - Html элемент, в котором нужно отобразить фотографии.
 */
const getPictures = (url, method = 'GET', onSuccess, onError, element) => {
  fetch(url, {
    method: method,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`При получении данных с сервера произошла ошибка. Код ошибки: ${response.status}`);
    })
    .then((data) => {
      onSuccess(data, element);
    })
    .catch((err) => {
      onError(err, element);
    });
};

/**
 * функция отправки данных формы на сервер.
 * @param {FormData} data - переменная в которой записана FormData отправляемой формы.
 * @param {function} onSuccess - функция, закрывающая окно формы.
 * @param {HTMLElement} button - кнопка отправки формы.
 */
const sendImageForm = (url, method = 'POST', formData, onSuccess, onError, button) => {
  blockSubmitButton(button);
  fetch(url,
    {
      method: method,
      body: formData,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`При отправке данных на сервер произошла ошибка. Код ошибки: ${response.status}`);
      }
    })
    .then(() => {
      onSuccess();
    })
    .catch((err) => {
      onError(err);
    })
    .finally(() => {
      unblockSubmitButton(button);
    });
};

export { getPictures, sendImageForm, URL };
