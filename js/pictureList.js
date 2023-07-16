const pictureTemplate = document.querySelector('#picture').content;

/**
 * функция, создающая элементы фотографий по шаблону.
 * @param {Array} data - массив, содержащий данные для создания элементов.
 * @param {HTMLElement} element - Html элемент в который будут добавлены фотографии.
 */
const createElements = (data, element) => {
  for (let i = 0; i < data.length; i++) {
    const newPicture = pictureTemplate.cloneNode(true);
    const picture = newPicture.querySelector('.picture');
    const img = newPicture.querySelector('.picture__img');
    const likes = newPicture.querySelector('.picture__likes');
    const comments = newPicture.querySelector('.picture__comments');
    img.src = data[i].url;
    img.alt = data[i].description;
    likes.textContent = data[i].likes;
    comments.textContent = data[i].comments.length;
    picture.dataset.id = data[i].id;

    element.append(newPicture);
  }
};

export { createElements };
