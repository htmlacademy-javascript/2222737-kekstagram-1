import {picturesContainer} from './miniatures.js';
import {isEscapeKey} from './const.js';

const documentBody = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseIcon = document.querySelector('.big-picture__cancel');

const bigPictureInfo = bigPicture.querySelector('.big-picture__social');

const socialCommentsCount = bigPictureInfo.querySelector('.social__comment-count');
const commentsCount = socialCommentsCount.querySelector('.comments-count');

const commentsLoader = bigPictureInfo.querySelector('.comments-loader');


const bigPictureImageDiv = bigPicture.querySelector('.big-picture__img');
const bigPictureImage = bigPictureImageDiv.querySelector('img');

const likesCount = bigPictureInfo.querySelector('.likes-count');

function onMiniatureOpen (evt) {
  if (evt.target.closest('.picture')) {
    const picture = evt.target.closest('.picture');
    bigPicture.classList.remove('hidden');
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    documentBody.classList.add('modal-open');
    bigPictureImage.src = evt.target.src;
    likesCount.textContent = picture.querySelector('.picture__likes').textContent;
    commentsCount.textContent = picture.querySelector('.picture__comments').textContent;
  }

  document.addEventListener('keydown', onDocumentKeyDown);
}

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalClose();
  }
}

function onModalClose () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

picturesContainer.addEventListener('click', onMiniatureOpen);

bigPictureCloseIcon.addEventListener('click', onModalClose);
