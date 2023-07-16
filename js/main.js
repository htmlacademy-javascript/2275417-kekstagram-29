import { onPictureClick } from './pictureFullSize.js';
import { openUpload } from './form.js';
import { getPictures } from './data.js';

const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

getPictures(pictureList);

pictureList.addEventListener('click', onPictureClick);

uploadInput.addEventListener('change', openUpload);
