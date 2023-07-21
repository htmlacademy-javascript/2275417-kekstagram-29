import { openUpload } from './form.js';
import { renderGallery } from './gallery.js';

const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

renderGallery(pictureList);

uploadInput.addEventListener('change', openUpload);
