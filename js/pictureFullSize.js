import { photos } from './pictureList.js';

const body = document.querySelector('body');
const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');
const pictureCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const closeButton = document.querySelector('.big-picture__cancel');
const pictureComments = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.comments-count');

pictureComments.innerHTML = '';

const onPictureEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePhoto();
  }
};

function fillComment(item) {
  item.comments.forEach((comment) => {
    const element = document.createElement('li');
    const img = document.createElement('img');
    const text = document.createElement('p');
    element.classList.add('social__comment');
    img.classList.add('social__picture');
    text.classList.add('social__text');
    img.src = comment.avatar;
    img.alt = comment.name;
    text.textContent = comment.message;
    pictureComments.appendChild(element);
    element.appendChild(img);
    element.appendChild(text);
  });
}

function openPhoto(picture, item) {
  picture.addEventListener('click', () => {
    const img = bigPictureImage.querySelector('img');
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
    document.addEventListener('keydown', onPictureEsc);
    closeButton.addEventListener('click', closePhoto);
    fillComment(item);
    img.src = item.url;
    likesCount.textContent = item.likes;
    commentsCount.textContent = item.comments.length;
    pictureCaption.textContent = item.description;
  });
}

function closePhoto() {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPictureEsc);
  closeButton.removeEventListener('click', closePhoto);
  pictureComments.innerHTML = '';
}


for (let i = 0; i < pictures.length; i++) {
  openPhoto(pictures[i], photos[i]);
}
