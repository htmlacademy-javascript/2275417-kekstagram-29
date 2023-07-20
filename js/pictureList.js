
import { getData } from './api.js';
import { showAlert } from './utility.js';

const pictureTemplate = document.querySelector('#picture').content;

const photos = [];

/**
 * функция, создающая Html элементы фотографий по шаблону.
 * @param {Array} data - массив, содержащий данные для создания элементов.
 * @param {HTMLElement} element - родительский html элемент в который будут добавлены фотографии.
 */
const createElements = (data, element) => {
  for (let i = 0; i < data.length; i++) {
    const newPicture = pictureTemplate.cloneNode(true);
    const picture = newPicture.querySelector('.picture');
    const img = newPicture.querySelector('.picture__img');
    const likes = newPicture.querySelector('.picture__likes');
    const comments = newPicture.querySelector('.picture__comments');
    img.src = data[i].url;
    img.alt = data[i].description;
    likes.textContent = data[i].likes;
    comments.textContent = data[i].comments.length;
    picture.dataset.id = data[i].id;

    element.append(newPicture);
  }
};

const renderPictures = async (element) => {
  try {
    const data = await getData();
    createElements(data, element);
    if (data !== undefined) {
      for (let i = 0; i < data.length; i++) {
        photos.push(data[i]);
      }
    }
  } catch (err) {
    showAlert(err);
  }
};

export { renderPictures, photos };
