import { pictureListFragment } from './pictureList.js';
import { onPictureClick } from './pictureFullSize.js';
import { openUpload } from './imageUpload.js';

const pictureList = document.querySelector('.pictures');
const uploadInput = document.querySelector('.img-upload__input');

const options = {
  attributes: true
};

pictureList.appendChild(pictureListFragment);

const observeClassChange = (mutationList) => {
  mutationList.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      if (document.body.classList.contains('modal-open')) {
        pictureList.removeEventListener('click', onPictureClick);
      } else {
        pictureList.addEventListener('click', onPictureClick);
      }
    }
  });
};

const observer = new MutationObserver(observeClassChange);
observer.observe(document.body, options);

pictureList.addEventListener('click', onPictureClick);

uploadInput.addEventListener('change', openUpload);
