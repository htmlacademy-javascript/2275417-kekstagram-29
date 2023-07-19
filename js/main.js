import { createPhotos } from './pictureList.js';
import { onPictureClick } from './pictureFullSize.js';
import { openUpload } from './form.js';
import { addError } from './formMessages.js';
import { getPictures, URL } from './api.js';


const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

getPictures(URL.Recieve, 'GET', createPhotos, addError, pictureList);

pictureList.addEventListener('click', onPictureClick);

uploadInput.addEventListener('change', openUpload);
