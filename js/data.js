import {getRandomInteger, generateRandomValues, generateUniqueRandomValues, getRandomElement} from './utils.js';

import {NAMES, MESSAGES, DESCRIPTIONS, NUMBER_OF_OBJECTS, NUMBER_OF_COMMENTS, MIN_ID, MAX_ID, MIN_URL, MAX_URL, MIN_LIKES, MAX_LIKES, MIN_AVATAR, MAX_AVATAR} from './const.js';

const generateRandomMessage = () => {
  const previousMessages = [];
  return function () {
    for (let i = 1; i <= (getRandomInteger(1, 2)); i++) {
      let currentMessage = getRandomElement(MESSAGES);
      while (previousMessages.includes(currentMessage)) {
        currentMessage = getRandomElement(MESSAGES);
      }
      previousMessages.push(currentMessage);
    }
    const joinedMessage = previousMessages.join(' ');
    return joinedMessage;
  };
};


const generateComment = () => {
  const randomGenerator = generateRandomValues();
  const randomMessage = generateRandomMessage();
  return {
    id: randomGenerator(),
    avatar: `/img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}`,
    message: randomMessage(),
    name: getRandomElement(NAMES),
  };
};


const generateObject = () => {
  const idRandomGenerator = generateUniqueRandomValues(MIN_ID, MAX_ID);
  const urlRandomGenerator = generateUniqueRandomValues(MIN_URL, MAX_URL);
  return {
    id: idRandomGenerator(),
    url: `photos/${urlRandomGenerator()}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: NUMBER_OF_COMMENTS}, generateComment),
  };
};

const arrayOfObjects = Array.from({length: NUMBER_OF_OBJECTS}, generateObject);

export {arrayOfObjects};
