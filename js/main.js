let names = ['Александр', 'Леонид', 'Вячеслав', 'Сергей', 'Влад', 'Петр'];

let messages = ['Все отлично!', 'В целом, всё неплохо. Но не всё.', 'Когда вы делаете фотографии, хорошо бы убирать палец из кадра. В конце концов, это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];


let getRandomInteger = (min, max) => {
  let minValue = Math.floor(Math.min(Math.abs(min), Math.abs(max)));
  let maxValue = Math.ceil(Math.max(Math.abs(min), Math.abs(max)));
  let randomValue = Math.random * (maxValue - minValue + 1) + minValue;
  return Math.floor(randomValue);
};

let getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let generateId = () => {
  let previousIds = [];
  return function () {
    let currentId = getRandomInteger(1, 25);
    while (previousIds.includes(currentId)) {
      currentId = getRandomInteger(1, 25);
    };
    previousIds.push(currentId);
    return currentId;
  };
};

let generateUrl = () => {
  let previousUrls = [];
  return function () {
    let currentUrl = getRandomInteger(1, 25);
    while (previousUrls.includes(currentUrl)) {
      currentUrl = getRandomInteger(1, 25);
    };
    previousUrls.push(currentUrl);
    return currentUrl;
  };
};


let generateObject = () =>
{
  id: '',
  url: '',
  description: 'Вот такое вот фото',
  likes: '',
  comments: '',
};
