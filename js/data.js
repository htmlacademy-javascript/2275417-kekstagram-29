import { createElements, pictureListFragment } from './pictureList.js';
import { uploadForm, onUploadEsc } from './form.js';

const uploadButton = uploadForm.querySelector('.img-upload__submit');

const photos = [];
const pictureList = document.querySelector('.pictures');
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;

const onSuccessEsc = (evt) => {
  const successWindow = document.querySelector('.success');
  if (evt.key === 'Escape') {
    evt.preventDefault();
    successWindow.remove();
    document.removeEventListener('keydown', onSuccessEsc);
  }
};

const onErrorEsc = (evt) => {
  const errorWindow = document.querySelector('.error');
  if (evt.key === 'Escape') {
    evt.preventDefault();
    errorWindow.remove();
    document.removeEventListener('keydown', onErrorEsc);
    document.addEventListener('keydown', onUploadEsc);
  }
};

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

const createErrorWindow = () => {
  const window = errorTemplate.cloneNode(true);
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

const createPhotos = (data) => {
  for (let i = 0; i < data.length; i++) {
    photos.push(data[i]);
  }
  return photos;
};

const generateError = (error, element) => {
  const message = document.createElement('p');
  message.textContent = error;
  element.append(message);
};

const getPictures = () => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`При получении данных с сервера произошла ошибка. Код ошибки: ${response.status}`);
    })
    .then((data) => {
      createElements(data);
      createPhotos(data);
    })
    .then(() => {
      pictureList.appendChild(pictureListFragment);
    })
    .catch((err) => {
      generateError(err, pictureList);
    });
};

const sendImageForm = (data, onSuccess) => {
  uploadButton.disabled = true;
  fetch('https://29.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
    })
    .then(() => {
      onSuccess();
      createSuccessWindow();
    })
    .catch(() => {
      createErrorWindow();
    })
    .finally(() => {
      uploadButton.disabled = false;
    });
};

export { photos, getPictures, sendImageForm };
