import { photos } from './pictureList.js';
import { closeWindow, openWindow } from './utility.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const pictureCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCommentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');

const options = {
  attributes: true
};

let commentsShown = 0;

const onPictureEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeWindow(bigPicture);
  }
};

const fillComments = (item) => {
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
    element.appendChild(img);
    element.appendChild(text);
    pictureCommentsList.appendChild(element);
  });
};

const hideShowMoreButton = () => {
  if (pictureCommentsList.children.length === commentsShown.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
  }
};

const hideComments = () => {
  for (let i = 5; i < pictureCommentsList.children.length; i++) {
    pictureCommentsList.children[i].classList.add('hidden');
  }
  commentsShown = bigPicture.querySelectorAll('.social__comment:not(.hidden)');
  hideShowMoreButton();
};

const showMore = () => {
  for (let i = commentsShown.length; i < (commentsShown.length + 5) && i < pictureCommentsList.children.length; i++) {
    pictureCommentsList.children[i].classList.remove('hidden');
  }
  commentsShown = bigPicture.querySelectorAll('.social__comment:not(.hidden)');
  bigPictureCommentsCount.textContent = `${commentsShown.length} из ${pictureCommentsList.children.length} комментариев`;
  hideShowMoreButton();
};

const openPhoto = (item) => {
  pictureCommentsList.innerHTML = '';
  openWindow(bigPicture);
  bigPictureImage.src = item.url;
  likesCount.textContent = item.likes;
  commentsCount.textContent = item.comments.length;
  pictureCaption.textContent = item.description;
  fillComments(item);
  hideComments();
  bigPictureCommentsCount.textContent = `${commentsShown.length} из ${pictureCommentsList.children.length} комментариев`;
};

const onPictureClick = (evt) => {
  const target = evt.target.closest('.picture');
  if (target) {
    const id = Number(target.dataset.id);
    photos.forEach((element, index) => {
      if (id === element.id) {
        openPhoto(photos[index]);
      }
    });
  }
};

const onOverlayClick = (evt) => {
  if (!evt.target.closest('.big-picture__preview')
    || evt.target.closest('.big-picture__cancel')) {
    closeWindow(bigPicture);
  }
};

const changeEvents = () => {
  if (bigPicture.classList.contains('hidden')) {
    document.removeEventListener('keydown', onPictureEsc);
    bigPicture.removeEventListener('click', onOverlayClick);
    bigPictureCommentsLoader.removeEventListener('click', showMore);
  } else {
    document.addEventListener('keydown', onPictureEsc);
    bigPicture.addEventListener('click', onOverlayClick);
    bigPictureCommentsLoader.addEventListener('click', showMore);
  }
};

const observeClassChange = (mutationList) => {
  mutationList.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      changeEvents();
    }
  });
};

const observer = new MutationObserver(observeClassChange);
observer.observe(bigPicture, options);

export { onPictureClick };
