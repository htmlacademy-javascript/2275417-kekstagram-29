import { openWindow, closeWindow, checkNoRepeatedElement, splitArray } from './utility.js';

/**
 * секция для загрузки и редактирования изображения.
 */
const upload = document.querySelector('.img-upload');
/**
 * загружаемое изображение в теге img.
 */
const uploadImage = upload.querySelector('.img-upload__preview img');
/**
 * файл загружаемого изображения.
 */
const uploadInput = upload.querySelector('.img-upload__input');
/**
 * скрываемое окно для редактирования изображения.
 */
const uploadOverlay = upload.querySelector('.img-upload__overlay');
/**
 * форма для передачи загружаемого изображения на сервер.
 */
const uploadForm = upload.querySelector('.img-upload__form');
/**
 * поле для ввода хештегов.
 */
const textHashtags = uploadForm.querySelector('.text__hashtags');
/**
 * поле для ввода комментария к изображению.
 */
const textDescripton = uploadForm.querySelector('.text__description');
const uploadScale = uploadForm.querySelector('.img-upload__scale');
/**
 * поле с текущим значением масштаба. readonly.
 */
const scaleValue = uploadScale.querySelector('.scale__control--value');
/**
 * контейнер со слайдером для изменения интенсивности накладываемого эффекта.
 */
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
/**
 * слайдер для изменения интенсивности накладываемого эффекта.
 */
const uploadSlider = uploadForm.querySelector('.effect-level__slider');
/**
 * список радиокнопок, отвечающих за тип накладываемого эффекта.
 */
const effects = uploadForm.querySelector('.effects__list');

/**
 * максимальная длина комментария.
 */
const MAX_TEXT_LENGTH = 140;
/**
 * регулярное выражение, определяющее валидный формат хештега.
 */
const hashtagRegular = /^#[a-zа-яё0-9]{1,19}$/i;
/**
 * переменная с названием выбранного фильтра.
 */
let activeFilter = '';

const options = {
  attributes: true
};

textDescripton.setAttribute('maxLength', MAX_TEXT_LENGTH);

/**
 * функция закрытия окна редактирования загружаемого изображения.
 * обновляет файл загружаемого значения, удаляет noUiSlider.
 */
const closeUpload = () => {
  closeWindow(uploadOverlay);
  uploadInput.value = '';
  uploadSlider.noUiSlider.destroy();
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
  errorTextTag: 'p'
});

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
  hashtagsArray.forEach(() => {
    found = hashtagsArray.every(testHashtag) &&
      checkNoRepeatedElement(hashtagsArray) &&
      hashtagsArray.length <= 5;
  });
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
  hashtagsArray.forEach(() => {
    if (!hashtagsArray.every(testHashtag)) {
      errorMessageOne = 'введён невалидный хэш-тег\n';
    }
  });
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

const validatePristine = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

/**
 * функция для изменения масштаба загружаемого изображения.
 * меняет отображаемое значение scaleValue.
 */
const changeScale = (evt) => {
  let value = scaleValue.value.replace('%', '');
  value = Number(value);
  if (evt.target.closest('.scale__control--smaller') && value > 0) {
    value -= 25;
  }
  if (evt.target.closest('.scale__control--bigger') && value < 100) {
    value += 25;
  }
  scaleValue.value = `${value}%`;
  uploadImage.style.transform = `scale(${value * 0.01})`;
};

/**
 * функция, меняющая настройки слайдера в зависимости от выбранного фильтра.
 * перезаписывает переменную activeFilter в соответствии с выбранным значением.
 * предназначена для обработчика событий на списке радиокнопок.
 */
const onFilterChange = (evt) => {
  if (evt.target.closest('.effects__radio#effect-none')) {
    sliderContainer.classList.add('hidden');
    activeFilter = 'none';
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
    });
  }
  if (evt.target.closest('.effects__radio#effect-chrome')) {
    activeFilter = 'chrome';
    sliderContainer.classList.remove('hidden');
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if (evt.target.closest('.effects__radio#effect-sepia')) {
    activeFilter = 'sepia';
    sliderContainer.classList.remove('hidden');
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
  if (evt.target.closest('.effects__radio#effect-marvin')) {
    activeFilter = 'marvin';
    sliderContainer.classList.remove('hidden');
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  if (evt.target.closest('.effects__radio#effect-phobos')) {
    activeFilter = 'phobos';
    sliderContainer.classList.remove('hidden');
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
  if (evt.target.closest('.effects__radio#effect-heat')) {
    activeFilter = 'heat';
    sliderContainer.classList.remove('hidden');
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  }
};

/**
 * обработчик изменений слайдера.
 * записывает отформатированные значения слайдера в style.filter загружаемого изображения.
 * формат зависит от значения переменной activeFilter.
 */
const setSliderUpdates = () => {
  uploadSlider.noUiSlider.on('update', () => {
    if (activeFilter === 'none' || activeFilter === '') {
      uploadImage.style.filter = '';
    }
    if (activeFilter === 'chrome') {
      uploadImage.style.filter = `grayscale(${uploadSlider.noUiSlider.get()})`;
    }
    if (activeFilter === 'sepia') {
      uploadImage.style.filter = `sepia(${uploadSlider.noUiSlider.get()})`;
    }
    if (activeFilter === 'marvin') {
      uploadImage.style.filter = `invert(${uploadSlider.noUiSlider.get()}%)`;
    }
    if (activeFilter === 'phobos') {
      uploadImage.style.filter = `blur(${uploadSlider.noUiSlider.get()}px)`;
    }
    if (activeFilter === 'heat') {
      uploadImage.style.filter = `brightness(${uploadSlider.noUiSlider.get()})`;
    }
  });
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
  uploadImage.style.filter = '';
  activeFilter = 'none';
  pristine.validate();
  sliderContainer.classList.add('hidden');
  effects.querySelector('.effects__radio#effect-none').checked = true;
  noUiSlider.create(uploadSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });
  setSliderUpdates();
};


/**
 * функция, меняющая обработчики событий в зависимости от класса hidden окна редактирования загружаемого изображения.
 */
const changeEvents = () => {
  if (uploadOverlay.classList.contains('hidden')) {
    uploadInput.addEventListener('change', openUpload);
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

export { openUpload };
