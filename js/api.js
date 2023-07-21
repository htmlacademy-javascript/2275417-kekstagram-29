const URL = {
  Recieve: 'https://29.javascript.pages.academy/kekstagram/data',
  Send: 'https://29.javascript.pages.academy/kekstagram',
};

const ERROR_TEXT = {
  GET: 'При получении данных с сервера произошла ошибка.',
  POST: 'При отправке данных на сервер произошла ошибка.',
};

/**
 * функция первичной обработки данных с сервера.
 * @param {String} url - адресс сервера.
 * @param {String} method - метод отправки/получения данных.
 * @param {String} errorText - текст сообщения об ошибке.
 * @param {FormData} formData - переменная в которой записана FormData отправляемой формы.
 */
const processData = (url, method, errorText = null, body = null) =>
  fetch(url,
    { method, body },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      if (method !== 'POST') {
        return response.json();
      }
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => processData(URL.Recieve, 'GET', ERROR_TEXT.GET);

const sendData = (body) => processData(URL.Send, 'POST', ERROR_TEXT.POST, body);

export { getData, sendData };
