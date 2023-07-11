import { sliderContainer, uploadSlider, uploadImage, effects } from './imageUpload.js';

/**
 * функция, меняющая настройки слайдера в зависимости от выбранного фильтра.
 * перезаписывает переменную activeFilter в соответствии с выбранным значением.
 * предназначена для обработчика событий на списке радиокнопок.
 */
const onFilterChange = (evt) => {
  if (effects.querySelector('.effects__radio#effect-none').checked) {
    sliderContainer.classList.add('hidden');
    uploadSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
    });
  } else {
    sliderContainer.classList.remove('hidden');
    if (evt.target.closest('.effects__radio#effect-chrome')) {
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
      uploadSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  }
};

/**
 * обработчик изменений слайдера.
 * записывает отформатированные значения слайдера в style.filter загружаемого изображения.
 * формат зависит от значения переменной activeFilter.
 */
const setSliderUpdates = () => {
  uploadSlider.noUiSlider.on('update', () => {
    if (effects.querySelector('.effects__radio#effect-none').checked) {
      uploadImage.style.filter = '';
    }
    if (effects.querySelector('.effects__radio#effect-chrome').checked) {
      uploadImage.style.filter = `grayscale(${uploadSlider.noUiSlider.get()})`;
    }
    if (effects.querySelector('.effects__radio#effect-sepia').checked) {
      uploadImage.style.filter = `sepia(${uploadSlider.noUiSlider.get()})`;
    }
    if (effects.querySelector('.effects__radio#effect-marvin').checked) {
      uploadImage.style.filter = `invert(${uploadSlider.noUiSlider.get()}%)`;
    }
    if (effects.querySelector('.effects__radio#effect-phobos').checked) {
      uploadImage.style.filter = `blur(${uploadSlider.noUiSlider.get()}px)`;
    }
    if (effects.querySelector('.effects__radio#effect-heat').checked) {
      uploadImage.style.filter = `brightness(${uploadSlider.noUiSlider.get()})`;
    }
  });
};

export { onFilterChange, setSliderUpdates };
