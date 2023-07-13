import { pictureListFragment } from './pictureList.js';
import { onPictureClick } from './pictureFullSize.js';
import { openUpload } from './form.js';

const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

pictureList.appendChild(pictureListFragment);

pictureList.addEventListener('click', onPictureClick);

uploadInput.addEventListener('change', openUpload);
