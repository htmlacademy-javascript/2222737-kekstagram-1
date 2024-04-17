import {picturesContainer} from './miniatures.js';

const bigPicture = document.querySelector('.big-picture');

function onMiniatureOpen (evt) {
  if (evt.target.closest('.picture')) {
    bigPicture.classList.remove('hidden');
  }
}

picturesContainer.addEventListener('click', onMiniatureOpen);

