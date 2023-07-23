import { closeWindow, openWindow, changeEvents, observeClassChange } from './utility.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const pictureCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCommentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');

const COMMENT_PER_PORTION = 5;

const options = {
  attributes: true
};

let commentsShown = [];

const onPictureEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeWindow(bigPicture);
  }
};

const createComments = (item) => {
  item.forEach((comment) => {
    const element = document.createElement('li');
    const img = document.createElement('img');
    const text = document.createElement('p');
    element.classList.add('social__comment');
    img.classList.add('social__picture');
    text.classList.add('social__text');
    img.src = comment.avatar;
    img.alt = comment.name;
    text.textContent = comment.message;
    element.append(img);
    element.append(text);
    pictureCommentsList.append(element);
  });
};

const loadComments = () => {
  if (!commentsShown.length) {
    return;
  }
  const additionalComments = commentsShown.slice(pictureCommentsList.children.length, pictureCommentsList.children.length + COMMENT_PER_PORTION);
  createComments(additionalComments);
  bigPictureCommentsCount.textContent = `${pictureCommentsList.children.length} из ${commentsShown.length} комментариев`;
  if (commentsShown.length <= pictureCommentsList.children.length) {
    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
  }
};

function fillComments({ comments }) {
  const firstComments = comments.slice(0, COMMENT_PER_PORTION);
  createComments(firstComments);
  bigPictureCommentsCount.textContent = `${firstComments.length} из ${comments.length} комментариев`;
  if (firstComments.length >= comments.length) {
    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
  }
}

const openPhoto = (item) => {
  pictureCommentsList.innerHTML = '';
  openWindow(bigPicture);
  commentsShown = item.comments;
  bigPictureImage.src = item.url;
  likesCount.textContent = item.likes;
  commentsCount.textContent = item.comments.length;
  pictureCaption.textContent = item.description;
  bigPictureCommentsCount.classList.remove('hidden');
  bigPictureCommentsLoader.classList.remove('hidden');
  fillComments(item);
};

const onOverlayClick = (evt) => {
  if (!evt.target.closest('.big-picture__preview')
    || evt.target.closest('.big-picture__cancel')) {
    closeWindow(bigPicture);
  }
};

const onPictureCloseEvents = () => {
  document.removeEventListener('keydown', onPictureEsc);
  bigPicture.removeEventListener('click', onOverlayClick);
  bigPictureCommentsLoader.removeEventListener('click', loadComments);
};

const onPictureOpenEvents = () => {
  document.addEventListener('keydown', onPictureEsc);
  bigPicture.addEventListener('click', onOverlayClick);
  bigPictureCommentsLoader.addEventListener('click', loadComments);
};

const changePictureEvents = () => changeEvents(bigPicture, onPictureCloseEvents, onPictureOpenEvents);

const observePictureChange = (mutationList) => observeClassChange(mutationList, changePictureEvents);

const observer = new MutationObserver(observePictureChange);
observer.observe(bigPicture, options);

export { openPhoto };
