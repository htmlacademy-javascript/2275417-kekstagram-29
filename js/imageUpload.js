import { openWindow, closeWindow, checkNoRepeatedElement } from './utility.js';

const upload = document.querySelector('.img-upload');
const uploadInput = upload.querySelector('.img-upload__input');
const uploadOverlay = upload.querySelector('.img-upload__overlay');
const uploadForm = upload.querySelector('.img-upload__form');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescripton = uploadForm.querySelector('.text__description');

const MAX_TEXT_LENGTH = 140;

const options = {
  attributes: true
};

const closeUpload = () => {
  closeWindow(uploadOverlay);
  uploadInput.value = '';
  textHashtags.value = '';
  textDescripton.value = '';
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const openUpload = () => {
  openWindow(uploadOverlay);
};

const onUploadEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement !== textHashtags &&
      document.activeElement !== textDescripton) {
      closeUpload();
    }
  }
};

const onOverlayClick = (evt) => {
  if (evt.target.matches('.img-upload__overlay')
    || evt.target.closest('.img-upload__cancel')) {
    closeUpload();
  }
};

const splitHashtags = (string) => {
  const hashtags = string.split(' ');
  const hashtagsArray = hashtags.filter((str) => str !== '');
  return hashtagsArray;
};

const validateHashtags = (value) => {
  const hashtagRegular = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtagLowerCase = value.toLowerCase();
  const hashtagsArray = splitHashtags(hashtagLowerCase);
  let found = true;
  hashtagsArray.forEach((element) => {
    found = hashtagRegular.test(element) &&
      checkNoRepeatedElement(hashtagsArray) &&
      hashtagsArray.length <= 5;
  });
  return found;
};

const getHashtagsError = () => {
  const hashtagRegular = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtagLowerCase = textHashtags.value.toLowerCase();
  const hashtagsArray = splitHashtags(hashtagLowerCase);
  let errorMessageOne = '';
  let errorMessageTwo = '';
  let errorMessageThree = '';
  hashtagsArray.forEach((element) => {
    if (!hashtagRegular.test(element)) {
      errorMessageOne = 'введён невалидный хэш-тег';
    }
  });
  if (!checkNoRepeatedElement(hashtagsArray)) {
    errorMessageTwo = 'введены повторяющиеся хеш-теги';
  }
  if (hashtagsArray.length > 5) {
    errorMessageThree = 'превышено количество хэш-тегов';
  }
  const errorMessage = `${errorMessageOne }<br>${ errorMessageTwo }<br>${ errorMessageThree}`;
  return errorMessage;
};

pristine.addValidator(textHashtags, validateHashtags, getHashtagsError);

const validateText = (value) => value.length <= MAX_TEXT_LENGTH;

pristine.addValidator(textDescripton,
  validateText,
  `Не более ${MAX_TEXT_LENGTH} символов`
);

const validatePristine = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const changeEvents = () => {
  if (uploadOverlay.classList.contains('hidden')) {
    uploadInput.addEventListener('change', openUpload);
    uploadForm.removeEventListener('submit', validatePristine);
  } else {
    document.addEventListener('keydown', onUploadEsc);
    uploadForm.addEventListener('click', onOverlayClick);
    uploadForm.addEventListener('submit', validatePristine);
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
observer.observe(uploadOverlay, options);

export { openUpload };
