import { pictureListFragment } from './pictureList.js';
import { onPictureClick } from './pictureFullSize.js';

const pictureList = document.querySelector('.pictures');

pictureList.appendChild(pictureListFragment);

pictureList.addEventListener('click', onPictureClick);
