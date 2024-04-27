import {picturesContainer} from './miniatures.js';
import {arrayOfObjects} from './data.js';
import {isEscapeKey, TEMPLATORS} from './const.js';
import {renderBlock, getById} from './utils.js';

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
const captionElement = bigPictureInfo.querySelector('.social__caption');

const commentsList = bigPictureInfo.querySelector('.social__comments');

function onMiniatureOpen (evt) {
  if (!evt.target.closest('.picture')) {
    return;
  }
  const picture = evt.target.closest('.picture');
  bigPicture.classList.remove('hidden');
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  documentBody.classList.add('modal-open');
  const id = picture.getAttribute('data-id');
  const data = getById(id, arrayOfObjects);
  const arrayOfComments = data.comments;
  bigPictureImage.src = data.url;
  likesCount.textContent = data.likes;
  commentsCount.textContent = arrayOfComments.length;
  captionElement.textContent = data.description;
  commentsList.innerHTML = '';
  const commentBlockString = TEMPLATORS.comments(arrayOfComments);
  renderBlock(commentsList, commentBlockString);
  bigPictureCloseIcon.addEventListener('click', onModalClose);

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
  bigPictureCloseIcon.removeEventListener('click', onModalClose);
  documentBody.classList.remove('modal-open');
}

picturesContainer.addEventListener('click', onMiniatureOpen);


