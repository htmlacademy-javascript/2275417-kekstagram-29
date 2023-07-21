import { openPhoto } from './pictureModal.js';
import { createElements } from './pictureList.js';
import { showAlert } from './utility.js';
import { getData } from './api.js';

const renderPhoto = (evt, pictures) => {
  const element = evt.target.closest('.picture');
  if (!element) {
    return;
  }
  const picture = pictures.find((item) => item.id === Number(element.dataset.id));
  openPhoto(picture);
};

const createGallery = (data, element) => {
  createElements(data, element);
  element.addEventListener('click', (evt) => {
    renderPhoto(evt, data);
  });
};

const renderGallery = async (element) => {
  try {
    const data = await getData();
    createGallery(data, element);
  } catch (err) {
    showAlert(err.message);
  }
};

export { renderGallery };
