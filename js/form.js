import { openWindow, closeWindow, blockSubmitButton, unblockSubmitButton, changeEvents, observeClassChange } from './utility.js';
import { pristine } from './image-validation.js';
import { onScaleChange } from './scale.js';
import { createSlider, onFilterChange, setSliderUpdates } from './effects.js';
import { createErrorWindow, createSuccessWindow } from './form-messages.js';
import { sendData } from './api.js';

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
const uploadButton = uploadForm.querySelector('.img-upload__submit');


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
  uploadForm.reset();
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
 * функция, сбрасывающая значения дополнительных элементов формы.
 */
const onOpenReset = () => {
  uploadImage.style.transform = '';
  sliderContainer.classList.add('hidden');
  uploadImage.style.filter = null;
};

/**
 * функция для открытия окна редактирования загружаемого значения.
 * обнуляет введенные значения, восстанавливает стандартные значения масштаба и фильтров, добавляет noUiSlider.
 */
const openUpload = () => {
  openWindow(uploadOverlay);
  createSlider(uploadSlider);
  setSliderUpdates();
  onOpenReset();
};

/**
 * функция для отправки данных формы.
 * @param {FormData} data - данные формы.
 */
const sendForm = (async (data) => {
  blockSubmitButton(uploadButton);
  try {
    await sendData(data);
    closeUpload();
    createSuccessWindow();
  } catch (err) {
    createErrorWindow(err.message);
  } finally {
    unblockSubmitButton(uploadButton);
  }
});

/**
 * функция отправки формы.
 * предназначена для обработчика событий.
 */
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    sendForm(formData);
  }
};

const onFormCloseEvents = () => {
  uploadForm.removeEventListener('click', onOverlayClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
  uploadScale.removeEventListener('click', onScaleChange);
  effects.removeEventListener('change', onFilterChange);
  document.removeEventListener('keydown', onUploadEsc);
};

const onFormOpenEvents = () => {
  uploadForm.addEventListener('click', onOverlayClick);
  uploadForm.addEventListener('submit', onFormSubmit);
  uploadScale.addEventListener('click', onScaleChange);
  effects.addEventListener('change', onFilterChange);
  document.addEventListener('keydown', onUploadEsc);
};

/**
 * функция, меняющая обработчики событий в зависимости от класса hidden окна редактирования загружаемого изображения.
 */
const changeFormEvents = () => changeEvents(uploadOverlay, onFormCloseEvents, onFormOpenEvents);

const observeFormChange = (mutationList) => observeClassChange(mutationList, changeFormEvents);

const observer = new MutationObserver(observeFormChange);
observer.observe(uploadOverlay, options);

export { openUpload, closeUpload, onUploadEsc, uploadForm, scaleValue, uploadImage, sliderContainer, uploadSlider, effects };
