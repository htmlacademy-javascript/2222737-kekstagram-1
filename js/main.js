const NAMES = ['Александр', 'Леонид', 'Вячеслав', 'Сергей', 'Влад', 'Петр'];

const MESSAGES = ['Все отлично!', 'В целом, всё неплохо. Но не всё.', 'Когда вы делаете фотографии, хорошо бы убирать палец из кадра. В конце концов, это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NUMBER_OF_OBJECTS = 25;

const NUMBER_OF_COMMENTS = 3;

const MIN_ID = 1;

const MAX_ID = 25;

const MIN_URL = 1;

const MAX_URL = 25;

const MIN_LIKES = 15;

const MAX_LIKES = 200;


const GET_RANDOM_INTEGER = (min, max) => {
  const MIN_VALUE = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  const MAX_VALUE = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));
  const RANDOM_VALUE = Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE;
  return Math.floor(RANDOM_VALUE);
};

const GET_RANDOM_ELEMENT = (elements) => elements[GET_RANDOM_INTEGER(0, elements.length - 1)];

const GENERATE_UNIQUE_RANDOM_VALUES = (x,y) => {
  const PREVIOUS_VALUES = [];
  return function () {
    let currentValue = GET_RANDOM_INTEGER(x, y);
    while (PREVIOUS_VALUES.includes(currentValue)) {
      currentValue = GET_RANDOM_INTEGER(x, y);
    }
    PREVIOUS_VALUES.push(currentValue);
    return currentValue;
  };
};

const GENERATE_RANDOM_VALUES = () => {
  const PREVIOUS_VALUES = [];
  return function () {
    let currentValue = Math.floor(Math.random() * 1000);
    while (PREVIOUS_VALUES.includes(currentValue)) {
      currentValue = Math.floor(Math.random() * 1000);
    }
    PREVIOUS_VALUES.push(currentValue);
    return currentValue;
  };
};


const GENERATE_COMMENT = () => {
  const RANDOM_GENERATOR = GENERATE_RANDOM_VALUES();
  return {
    id: RANDOM_GENERATOR(),
    avatar: `/img/avatar-${GET_RANDOM_INTEGER(1, 6)}`,
    message: GET_RANDOM_ELEMENT(MESSAGES),
    name: GET_RANDOM_ELEMENT(NAMES),
  };
};

const ARRAY_OF_COMMENTS = Array.from({length: NUMBER_OF_COMMENTS}, GENERATE_COMMENT());

const GENERATE_OBJECT = () => {
  const ID_RANDOM_GENERATOR = GENERATE_UNIQUE_RANDOM_VALUES(MIN_ID, MAX_ID);
  const URL_RANDOM_GENERATOR = GENERATE_UNIQUE_RANDOM_VALUES(MIN_URL, MAX_URL);
  return {
    id: ID_RANDOM_GENERATOR(),
    url: `photos/${URL_RANDOM_GENERATOR()}.jpg`,
    description: 'Вот такое вот фото',
    likes: GET_RANDOM_INTEGER(MIN_LIKES, MAX_LIKES),
    comments: ARRAY_OF_COMMENTS,
  };
};

const ARRAY_OF_OBJECTS = Array.from({length: NUMBER_OF_OBJECTS}, GENERATE_OBJECT);

console.log(ARRAY_OF_OBJECTS);
