import { sliderContainer, uploadSlider, uploadImage } from './form.js';

const effectLevel = document.querySelector('.effect-level__value');

const filterOptions = {
  'none': {
    min: 0,
    max: 100,
    step: 1,
  },
  'chrome': {
    style: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'sepia': {
    style: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
  },
  'marvin': {
    style: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
  },
  'phobos': {
    style: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
  },
  'heat': {
    style: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

let activeFilter = 'none';

/**
 * функция, создающая noUiSlider на заданном элементе
 */
const createSlider = (element) => {
  noUiSlider.create(element, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
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
};

/**
 * функция с логикой обновления настроек слайдера.
 * настройки стоит брать из словаря filterOptions.
 */
const updateSlider = ({ min, max, step }) => {
  uploadSlider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

/**
 * функция меняющая настройки слайдера в зависимости от выбранного фильтра.
 * меняет значение переменной activeFilter в соответствии с выбранной радиокнопкой.
 * предназначена для обработчика событий на списке радиокнопок.
 */
const onFilterChange = (evt) => {
  if (evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    activeFilter = evt.target.value;
    updateSlider(filterOptions[activeFilter]);
    return;
  }
  sliderContainer.classList.remove('hidden');
  activeFilter = evt.target.value;
  updateSlider(filterOptions[activeFilter]);
};

/**
 * обработчик изменений слайдера.
 * записывает отформатированные значения слайдера в style.filter загружаемого изображения.
 * формат зависит от значения переменной activeFilter.
 */
const setSliderUpdates = () => {
  uploadSlider.noUiSlider.on('update', () => {
    if (activeFilter === 'none') {
      uploadImage.style.filter = null;
      return;
    }
    const { style, unit } = filterOptions[activeFilter];
    const value = uploadSlider.noUiSlider.get();
    effectLevel.value = value;
    uploadImage.style.filter = `${style}(${value}${unit})`;
  });
};

export { createSlider, onFilterChange, setSliderUpdates };
