import {arrayOfObjects} from './data.js';
import './bigpicture.js';

const picturesContainer = document.querySelector('.pictures');

const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureFragment = document.createDocumentFragment();

arrayOfObjects.forEach(({url,comments,likes}) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = url;
  const miniatureInfo = miniatureElement.querySelector('.picture__info');
  miniatureInfo.querySelector('.picture__comments').textContent = comments.length;
  miniatureInfo.querySelector('.picture__likes').textContent = likes;
  pictureFragment.append(miniatureElement);
}
);
picturesContainer.append(pictureFragment);

export {picturesContainer};
