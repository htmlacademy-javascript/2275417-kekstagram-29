import { splitArray, checkNoRepeatedElement } from './utility.js';

const upload = document.querySelector('.img-upload');
const uploadForm = upload.querySelector('.img-upload__form');
const textDescripton = uploadForm.querySelector('.text__description');
const textHashtags = uploadForm.querySelector('.text__hashtags');

/**
 * регулярное выражение, определяющее валидный формат хештега.
 */
const hashtagRegular = /^#[a-zа-яё0-9]{1,19}$/i;

/**
 * максимальная длина комментария.
 */
const MAX_TEXT_LENGTH = 140;

textDescripton.setAttribute('maxLength', MAX_TEXT_LENGTH);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
  errorTextTag: 'p'
});

/**
 * функция для проверки валидности введенного хештега.
 * @returns boolean.
 */
const testHashtag = (currentValue) => hashtagRegular.test(currentValue.toString());

/**
 * функция для валидации поля хештегов.
 * @returns boolean.
 */
const validateHashtags = (value) => {
  const hashtagLowerCase = value.toLowerCase();
  const hashtagsArray = splitArray(hashtagLowerCase, ' ');
  let found = true;
  for (let i = 0; i < hashtagsArray.length; i++) {
    found = hashtagsArray.every(testHashtag) &&
      checkNoRepeatedElement(hashtagsArray) &&
      hashtagsArray.length <= 5;
  }
  return found;
};

/**
 * функция создания сообщения об ошибке для поля ввода хештегов.
 * @returns строку hashtagErrorMessage, содержащую сообщения о всех допущенных ошибках.
 */
const getHashtagsError = () => {
  const hashtagLowerCase = textHashtags.value.toLowerCase();
  const hashtagsArray = splitArray(hashtagLowerCase, ' ');
  let errorMessageOne = '';
  let errorMessageTwo = '';
  let errorMessageThree = '';
  let hashtagErrorMessage = '';
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (!hashtagsArray.every(testHashtag)) {
      errorMessageOne = 'введён невалидный хэш-тег\n';
    }
  }
  if (!checkNoRepeatedElement(hashtagsArray)) {
    errorMessageTwo = 'введены повторяющиеся хеш-теги\n';
  }
  if (hashtagsArray.length > 5) {
    errorMessageThree = 'превышено количество хэш-тегов\n';
  }
  hashtagErrorMessage = errorMessageOne + errorMessageTwo + errorMessageThree;
  return hashtagErrorMessage;
};

pristine.addValidator(textHashtags, validateHashtags, getHashtagsError);

export { pristine };
