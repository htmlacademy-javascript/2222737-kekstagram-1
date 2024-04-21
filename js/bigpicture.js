import {picturesContainer} from './miniatures.js';
import {arrayOfObjects} from './data.js';
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
const captionElement = bigPictureInfo.querySelector('.social__caption');

const commentsList = bigPictureInfo.querySelector('.social__comments');
const singleComment = commentsList.querySelector('.social__comment');

let isCompleted = false;

function onMiniatureOpen (evt) {
  if (evt.target.closest('.picture')) {
    const picture = evt.target.closest('.picture');
    bigPicture.classList.remove('hidden');
    socialCommentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    documentBody.classList.add('modal-open');
    const id = picture.getAttribute('data-id');
    const data = arrayOfObjects.find((object) => object.id === Number(id));
    console.log(id,data);
    bigPictureImage.src = picture.querySelector('.picture__img').src;
    likesCount.textContent = picture.querySelector('.picture__likes').textContent;
    commentsCount.textContent = picture.querySelector('.picture__comments').textContent;
    captionElement.textContent = data.description;
    const arrayOfComments = data.comments;
    const commentFragment = document.createDocumentFragment();
    if (!isCompleted) {
      arrayOfComments.forEach(({avatar,message,authorName}) => {
        const commentElement = singleComment.cloneNode(true);
        commentElement.querySelector('.social__picture').src = avatar;
        commentElement.querySelector('.social__picture').alt = authorName;
        commentElement.querySelector('.social__text').textContent = message;
        commentFragment.append(commentElement);
      }
      );
      commentsList.append(commentFragment);
      isCompleted = true;
    }
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
