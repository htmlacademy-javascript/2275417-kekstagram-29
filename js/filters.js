import { removeElements } from './utility.js';

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

const sortPictures = (data, inputFunction, element) => {
  const pictures = [...data];
  if (activeFilter === Filter.RANDOM) {
    removeElements(element.querySelectorAll('.picture'));
    const dataSlice = pictures.sort(sortRandomly).slice(0, PICTURES_COUNT);
    inputFunction(dataSlice, element);
  }
  if (activeFilter === Filter.DISCUSSED) {
    removeElements(element.querySelectorAll('.picture'));
    pictures.sort(sortByComments);
    inputFunction(pictures, element);
  }
  if (activeFilter === Filter.DEFAULT) {
    removeElements(element.querySelectorAll('.picture'));
    return inputFunction(data, element);
  }
};

const onFilterClick = (data, inputFunction, element) => {
  filters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const target = evt.target;
    if (target.id === activeFilter) {
      return;
    }
    filters
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
    activeFilter = target.id;
    sortPictures(data, inputFunction, element);
  });
};

const setFilters = (data, inputFunction, element) => {
  filters.classList.remove('img-filters--inactive');
  onFilterClick(data, inputFunction, element);
};

export { setFilters };
