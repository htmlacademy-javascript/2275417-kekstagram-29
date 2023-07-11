import { scaleValue, uploadImage } from './imageUpload.js';

/**
 * функция для изменения масштаба загружаемого изображения.
 * меняет отображаемое значение scaleValue.
 */
const changeScale = (evt) => {
  let value = scaleValue.value.replace('%', '');
  value = Number(value);
  if (evt.target.closest('.scale__control--smaller') && value > 0) {
    value -= 25;
  }
  if (evt.target.closest('.scale__control--bigger') && value < 100) {
    value += 25;
  }
  scaleValue.value = `${value}%`;
  uploadImage.style.transform = `scale(${value * 0.01})`;
};

export { changeScale };
