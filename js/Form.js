import { openWindow, closeWindow } from './utility.js';
import { pristine, validatePristine } from './ImageValidation.js';
import { changeScale } from './Scale.js';
import { createSlider, onFilterChange, setSliderUpdates } from './Filters.js';

const upload = document.querySelector('.img-upload');
const uploadImage = upload.querySelector('.img-upload__preview img');
const uploadInput = upload.querySelector('.img-upload__input');
const uploadOverlay = upload.querySelector('.img-upload__overlay');
const uploadForm = upload.querySelector('.img-upload__form');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescripton = uploadForm.querySelector('.text__description');
const uploadScale = uploadForm.querySelector('.img-upload__scale');
const scaleValue = uploadScale.querySelector('.scale__control--value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const uploadSlider = uploadForm.querySelector('.effect-level__slider');
const effects = uploadForm.querySelector('.effects__list');


const options = {
  attributes: true
};

/**
 * функция закрытия окна редактирования загружаемого изображения.
 * обновляет файл загружаемого значения, удаляет noUiSlider.
 */
const closeUpload = () => {
  closeWindow(uploadOverlay);
  uploadInput.value = '';
  uploadSlider.noUiSlider.destroy();
  pristine.reset();
};

/**
 * функция, закрывающая окно редактирования загружаемого изображения по нажатию Esc.
 * предназначена для обработчика событий.
 */
const onUploadEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement !== textHashtags &&
      document.activeElement !== textDescripton) {
      closeUpload();
    }
  }
};

/**
 * функция, закрывающая окно редактирования загружаемого изображения по нажатию на кнопку закрытия, или по нажатию на фоновую область.
 * предназначена для обработчика событий.
 */
const onOverlayClick = (evt) => {
  if (evt.target.matches('.img-upload__overlay')
    || evt.target.closest('.img-upload__cancel')) {
    closeUpload();
  }
};

/**
 * функция для открытия окна редактирования загружаемого значения.
 * обнуляет введенные значения, восстанавливает стандартные значения масштаба и фильтров, добавляет noUiSlider.
 */
const openUpload = () => {
  openWindow(uploadOverlay);
  textHashtags.value = '';
  textDescripton.value = '';
  uploadImage.style.transform = '';
  scaleValue.value = '100%';
  sliderContainer.classList.add('hidden');
  effects.querySelector('.effects__radio#effect-none').checked = true;
  createSlider(uploadSlider);
  setSliderUpdates();
  uploadImage.style.filter = null;
};


/**
 * функция, меняющая обработчики событий в зависимости от класса hidden окна редактирования загружаемого изображения.
 */
const changeEvents = () => {
  if (uploadOverlay.classList.contains('hidden')) {
    uploadForm.removeEventListener('click', onOverlayClick);
    uploadForm.removeEventListener('submit', validatePristine);
    uploadScale.removeEventListener('click', changeScale);
    effects.removeEventListener('change', onFilterChange);
    document.removeEventListener('keydown', onUploadEsc);
  } else {
    uploadForm.addEventListener('click', onOverlayClick);
    uploadForm.addEventListener('submit', validatePristine);
    uploadScale.addEventListener('click', changeScale);
    effects.addEventListener('change', onFilterChange);
    document.addEventListener('keydown', onUploadEsc);
  }
};

/**
 * функция для настройки mutationObserver на смену классов
 */
const observeClassChange = (mutationList) => {
  mutationList.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      changeEvents();
    }
  });
};

const observer = new MutationObserver(observeClassChange);
observer.observe(uploadOverlay, options);

export { openUpload, upload, scaleValue, uploadImage, sliderContainer, uploadSlider, effects };
