import { photos, pictureListFragment } from './pictureList.js';
import { openPhoto } from './pictureFullSize.js';

const pictureList = document.querySelector('.pictures');

pictureList.appendChild(pictureListFragment);

const pictures = document.querySelectorAll('.picture');

for (let i = 0; i < pictures.length; i++) {
  openPhoto(pictures[i], photos[i]);
}
