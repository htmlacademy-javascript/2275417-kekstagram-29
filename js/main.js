import { renderPictures } from './pictureList.js';
import { onPictureClick } from './pictureFullSize.js';
import { openUpload } from './form.js';

const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

renderPictures(pictureList);

pictureList.addEventListener('click', onPictureClick);

uploadInput.addEventListener('change', openUpload);
