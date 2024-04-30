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

function generateModalContent (evt) {
  if (!evt.target.closest('.picture')) {
    return;
  }
  openModal();
  const picture = evt.target.closest('.picture');
  const id = picture.getAttribute('data-id');
  const data = getById(id, arrayOfObjects);
  const arrayOfComments = data.comments;
  let n = 5;
  const arrayForRendering = [...arrayOfComments];
  const firstFiveComments = arrayForRendering.splice(0, 5);
  bigPictureImage.src = data.url;
  likesCount.textContent = data.likes;
  commentsCount.textContent = arrayOfComments.length;
  captionElement.textContent = data.description;
  commentsList.innerHTML = '';
  const commentBlockString = TEMPLATORS.comments(firstFiveComments);
  renderBlock(commentsList, commentBlockString);

  commentsLoader.addEventListener('click', () => {
    const commentsPortion = arrayForRendering.splice(0, 5);
    const commentsPortionString = TEMPLATORS.comments(commentsPortion);
    renderBlock(commentsList, commentsPortionString);
    if (n < arrayOfComments.length) {
      n += 5;
      socialCommentsCount.textContent = `${n} из ${commentsCount.textContent} комментариев`;
    }
    if (n >= arrayOfComments.length) {
      commentsLoader.classList.add('hidden');
    }
  });
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


