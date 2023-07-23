const Url = {
  RECIEVE: 'https://29.javascript.pages.academy/kekstagram/data',
  SEND: 'https://29.javascript.pages.academy/kekstagram',
};

const ErrorText = {
  GET: 'При получении данных с сервера произошла ошибка.',
  POST: 'При отправке данных на сервер произошла ошибка.',
};

/**
 * функция первичной обработки данных с сервера.
 * @param {String} url - адресс сервера.
 * @param {String} method - метод отправки/получения данных.
 * @param {String} errorText - текст сообщения об ошибке.
 * @param {FormData} body - переменная в которой записана FormData отправляемой формы.
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

/**
 * функция получения данных с сервера.
 */
const getData = () => processData(Url.RECIEVE, 'GET', ErrorText.GET);

/**
 * функция отправки данных на сервер.
 * @param {FormData} body - данные формы.
 */
const sendData = (body) => processData(Url.SEND, 'POST', ErrorText.POST, body);

export { getData, sendData };
