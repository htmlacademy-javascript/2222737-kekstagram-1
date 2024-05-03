import {picturesContainer} from './miniatures.js';
import {arrayOfObjects} from './data.js';
import {renderBlock, getById, isEscapeKey, TEMPLATORS} from './utils.js';

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


function openModal () {

  bigPicture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  documentBody.classList.add('modal-open');

  bigPictureCloseIcon.addEventListener('click', onModalClose);

  document.addEventListener('keydown', onDocumentKeyDown);

}

function loadComments(comments) {

  const arrayForRendering = [...comments];
  const commentsLength = comments.length;
  return function () {
    const commentsPortion = arrayForRendering.splice(0, 5);
    const commentsPortionString = TEMPLATORS.comments(commentsPortion);
    renderBlock(commentsList, commentsPortionString);
    const commentsNumber = commentsLength - arrayForRendering.length;
    socialCommentsCount.textContent = `${commentsNumber} из ${commentsLength} комментариев`;
    if (commentsNumber >= commentsLength) {
      commentsLoader.classList.add('hidden');
    }
  };

}

function generateModalContent (evt) {

  if (!evt.target.closest('.picture')) {
    return;
  }
  openModal();
  const picture = evt.target.closest('.picture');
  const id = picture.getAttribute('data-id');
  const dataObject = getById(id, arrayOfObjects);
  const data = Object.assign({}, dataObject);
  bigPictureImage.src = data.url;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  captionElement.textContent = data.description;
  commentsList.innerHTML = '';
  const generateComments = loadComments(data.comments);
  generateComments();

  commentsLoader.addEventListener('click', generateComments);

}

function onDocumentKeyDown (evt) {

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalClose();
  }

}

function onModalClose () {

  bigPicture.classList.add('hidden');
  socialCommentsCount.textContent = `5 из ${commentsCount.textContent} комментариев`;
  document.removeEventListener('keydown', onDocumentKeyDown);
  bigPictureCloseIcon.removeEventListener('click', onModalClose);
  documentBody.classList.remove('modal-open');

}

picturesContainer.addEventListener('click', generateModalContent);


