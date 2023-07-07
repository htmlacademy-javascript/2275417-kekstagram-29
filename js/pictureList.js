import { createPhotos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content;

const photos = createPhotos();
const pictureListFragment = document.createDocumentFragment();

photos.forEach((item) => {
  const newPicture = pictureTemplate.cloneNode(true);
  const picture = newPicture.querySelector('.picture');
  const img = newPicture.querySelector('.picture__img');
  const likes = newPicture.querySelector('.picture__likes');
  const comments = newPicture.querySelector('.picture__comments');
  img.src = item.url;
  img.alt = item.description;
  likes.textContent = item.likes;
  comments.textContent = item.comments.length;
  picture.dataset.id = item.id;

  pictureListFragment.append(newPicture);
});

export { photos, pictureListFragment };
