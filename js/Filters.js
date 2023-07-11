import { sliderContainer, uploadSlider, uploadImage } from './Form.js';

const upload = document.querySelector('.img-upload');
const effectLevel = upload.querySelector('.effect-level__value');

const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const filterStyle = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const filterSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

let activeFilter = Effect.DEFAULT;

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
 * функция, меняющая формат стиля изображения в зависмости от значения переменной activeFilter.
 */
const setImageStyle = () => {
  if (activeFilter === Effect.DEFAULT) {
    uploadImage.style.filter = null;
    return;
  }
  const value = effectLevel.value;
  const { style, unit } = filterStyle[activeFilter];
  uploadImage.style.filter = `${style}(${value}${unit})`;
};

/**
 * функция с логикой обновления настроек слайдера.
 * настройки должны браться из словаря filterSliderOptions.
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
 * предназначена для обработчика событий на списке радиокнопок.
 */
const onFilterChange = (evt) => {
  if (evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
    activeFilter = (evt.target.value);
    updateSlider(filterSliderOptions[activeFilter]);
  } else {
    sliderContainer.classList.remove('hidden');
    activeFilter = (evt.target.value);
    updateSlider(filterSliderOptions[activeFilter]);
  }
};

/**
 * обработчик изменений слайдера.
 * записывает отформатированные значения слайдера в style.filter загружаемого изображения.
 * формат зависит от выбранной радиокнопки.
 */
const setSliderUpdates = () => {
  uploadSlider.noUiSlider.on('update', () => {
    effectLevel.value = uploadSlider.noUiSlider.get();
    setImageStyle();
  });
};

export { createSlider, onFilterChange, setSliderUpdates };
