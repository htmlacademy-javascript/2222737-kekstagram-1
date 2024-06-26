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

const renderBlock = (container, object) => {
  container.insertAdjacentHTML('afterbegin', object);
};

const getById = function(id, array) {
  return(array.find((object) => object.id === Number(id)));
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const TEMPLATORS = {comments: (dataArray) => dataArray.map((element) => `<li class="social__comment"><img class="social__picture" src="${element.avatar}" alt="${element.authorName}" width = "35" height="35"><p class="social__text">${element.message}</p></li>`).join()};

export {getRandomInteger, generateRandomValues, generateUniqueRandomValues,
  getRandomElement, renderBlock, getById, isEscapeKey, TEMPLATORS};
