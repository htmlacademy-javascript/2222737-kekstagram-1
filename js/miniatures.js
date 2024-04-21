import {arrayOfObjects} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const pictureFragment = document.createDocumentFragment();

arrayOfObjects.forEach(({url,comments,likes,id}) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.setAttribute('data-id', id);
  const miniatureInfo = miniatureElement.querySelector('.picture__info');
  miniatureInfo.querySelector('.picture__comments').textContent = comments.length;
  miniatureInfo.querySelector('.picture__likes').textContent = likes;
  pictureFragment.append(miniatureElement);
}
);
picturesContainer.append(pictureFragment);

export {picturesContainer};
