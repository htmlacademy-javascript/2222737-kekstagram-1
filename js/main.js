const NAMES = ['Александр', 'Леонид', 'Вячеслав', 'Сергей', 'Влад', 'Петр'];

const MESSAGES = ['Все отлично!', 'В целом, всё неплохо. Но не всё.', 'Когда вы делаете фотографии, хорошо бы убирать палец из кадра. В конце концов, это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTIONS = ['Отдыхаем от забот', 'Это фото - образец лаконичности', 'Заснять каждый момент', 'Любовь в каждом кадре', 'Фото, вошедшее в историю'];

const NUMBER_OF_OBJECTS = 25;

const NUMBER_OF_COMMENTS = 3;

const MIN_ID = 1;

const MAX_ID = 25;

const MIN_URL = 1;

const MAX_URL = 25;

const MIN_LIKES = 15;

const MAX_LIKES = 200;

const MIN_AVATAR = 1;

const MAX_AVATAR = 6;


const getRandomInteger = (min, max) => {
  const minValue = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  const maxValue = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));
  const randomValue = Math.random() * (maxValue - minValue + 1) + minValue;
  return Math.floor(randomValue);
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateUniqueRandomValues = (x,y) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(x, y);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(x, y);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateRandomValues = () => {
  const previousValues = [];
  return function () {
    let currentValue = Math.floor(Math.random() * 1000);
    while (previousValues.includes(currentValue)) {
      currentValue = Math.floor(Math.random() * 1000);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

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

console.log(arrayOfObjects);
