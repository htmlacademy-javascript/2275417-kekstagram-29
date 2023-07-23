const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filters = document.querySelector('.img-filters');

let activeFilter = Filter.DEFAULT;

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (itemA, itemB) => itemB.comments.length - itemA.comments.length;

/**
 * функция сортировки изображений
 * @param {Array} data - массив из которого берутся данные для сортировки.
 * @param {Function} inputFunction - функция отрисовки изображений.
 * @param {HTMLElement} element - элемент, в котором находятся изображения.
 */
const sortPictures = (data, inputFunction, element) => {
  const pictures = [...data];
  if (activeFilter === Filter.RANDOM) {
    const dataSlice = pictures.sort(sortRandomly).slice(0, PICTURES_COUNT);
    inputFunction(dataSlice, element);
  }
  if (activeFilter === Filter.DISCUSSED) {
    pictures.sort(sortByComments);
    inputFunction(pictures, element);
  }
  if (activeFilter === Filter.DEFAULT) {
    return inputFunction(data, element);
  }
};

/**
 * функция, устанавливающая обработчик событий для сортировки.
 * @param {Array} data - массив из которого берутся данные для сортировки.
 * @param {Function} inputFunction - функция отрисовки изображений.
 * @param {HTMLElement} element - элемент, в котором находятся изображения.
 */
const onFilterClick = (data, inputFunction, element) => {
  filters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const target = evt.target;
    if (target.id === activeFilter) {
      return;
    }
    const active = filters.querySelector('.img-filters__button--active');
    target.classList.add('img-filters__button--active');
    active.classList.remove('img-filters__button--active');
    activeFilter = target.id;
    sortPictures(data, inputFunction, element);
  });
};

/**
 * функция, инициализирующая фильтры на странице.
 * @param {Array} data - массив из которого берутся данные для сортировки.
 * @param {Function} inputFunction - функция отрисовки изображений.
 * @param {HTMLElement} element - элемент, в котором находятся изображения.
 */
const setFilters = (data, inputFunction, element) => {
  filters.classList.remove('img-filters--inactive');
  onFilterClick(data, inputFunction, element);
};

export { setFilters };
