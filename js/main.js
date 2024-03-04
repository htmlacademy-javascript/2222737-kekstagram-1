const NAMES = ['Александр', 'Леонид', 'Вячеслав', 'Сергей', 'Влад', 'Петр'];

const MESSAGES = ['Все отлично!', 'В целом, всё неплохо. Но не всё.', 'Когда вы делаете фотографии, хорошо бы убирать палец из кадра. В конце концов, это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NUMBER_OF_OBJECTS = 25;

let getRandomInteger = (min, max) => {
  let minValue = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  let maxValue = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));
  let randomValue = Math.random() * (maxValue - minValue + 1) + minValue;
  return Math.floor(randomValue);
};

let getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let generateUniqueRandomValues = (x,y) => {
  let previousValues = [];
  return function () {
    let currentValue = getRandomInteger(x, y);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(x, y);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

let generateRandomValues = () => {
  let previousValues = [];
  return function () {
    let currentValue = Math.random() * 1000;
    while (previousValues.includes(currentValue)) {
      currentValue = Math.random() * 1000;
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};


let generateComment = () => ({
  id: generateRandomValues(),
  avatar: `/img/avatar-${getRandomInteger(1, 6)}`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES),
});


let generateObject = () =>
  ({
    id: generateUniqueRandomValues(1, 25),
    url: `photos/${generateUniqueRandomValues(1, 25)}.jpg`,
    description: 'Вот такое вот фото',
    likes: getRandomInteger(15, 200),
    comments: generateComment(),
  });

let arrayOfObjects = Array.from({length: NUMBER_OF_OBJECTS}, generateObject);

