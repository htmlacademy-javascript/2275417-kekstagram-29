import { scaleValue, uploadImage } from './form.js';

/**
 * функция для изменения масштаба загружаемого изображения.
 * меняет отображаемое значение  scaleValue.
 */
const onScaleChange = (evt) => {
  let value = scaleValue.value.replace('%', '');
  value = Number(value);
  if (evt.target.closest('.scale__control--smaller') && value > 25) {
    value -= 25;
  }
  if (evt.target.closest('.scale__control--bigger') && value < 100) {
    value += 25;
  }
  scaleValue.value = `${value}%`;
  uploadImage.style.transform = `scale(${value * 0.01})`;
};

export { onScaleChange };
