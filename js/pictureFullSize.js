const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const pictureCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const pictureCommentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');

let commentsShown = 0;

function onPictureEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePhoto();
  }
}

function fillComments(item) {
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
}

function hideShowMoreButton() {
  if (pictureCommentsList.children.length === commentsShown.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
  }
}

function hideComments() {
  for (let i = 5; i < pictureCommentsList.children.length; i++) {
    pictureCommentsList.children[i].classList.add('hidden');
  }
  commentsShown = bigPicture.querySelectorAll('.social__comment:not(.hidden)');
  hideShowMoreButton();
}

function showMore() {
  for (let i = commentsShown.length; i < (commentsShown.length + 5) && i < pictureCommentsList.children.length; i++) {
    pictureCommentsList.children[i].classList.remove('hidden');
  }
  commentsShown = bigPicture.querySelectorAll('.social__comment:not(.hidden)');
  bigPictureCommentsCount.textContent = `${commentsShown.length} из ${pictureCommentsList.children.length} комментариев`;
  hideShowMoreButton();
}

function onOverlayClick(evt) {
  if (!evt.target.closest('.big-picture__preview') || evt.target.closest('.big-picture__cancel')) {
    closePhoto();
  }
}

function openPhoto(picture, item) {
  picture.addEventListener('click', () => {
    pictureCommentsList.innerHTML = '';
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onPictureEsc);
    bigPicture.addEventListener('click', onOverlayClick);
    bigPictureImage.src = item.url;
    likesCount.textContent = item.likes;
    commentsCount.textContent = item.comments.length;
    pictureCaption.textContent = item.description;
    fillComments(item);
    hideComments();
    bigPictureCommentsCount.textContent = `${commentsShown.length} из ${pictureCommentsList.children.length} комментариев`;
    bigPictureCommentsLoader.addEventListener('click', showMore);
  });
}

function closePhoto() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPictureEsc);
  bigPictureCommentsLoader.removeEventListener('click', showMore);
  bigPicture.removeEventListener('click', onOverlayClick);
}

export { openPhoto };
