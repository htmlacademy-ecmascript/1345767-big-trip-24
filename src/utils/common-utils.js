const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIntegerArray = (min, max) => {
  const randomIntegerArray = [];

  while (randomIntegerArray.length !== max) {
    let newElement = getRandomInteger(min, max);
    const result = randomIntegerArray.every((element) => element !== newElement);

    if (result) {
      randomIntegerArray.push(newElement);
    } else {
      newElement = getRandomInteger(min, max);
    }
  }
  return randomIntegerArray;
};

const createIdGenerator = () => {
  let numberId = 0;

  return () => {
    numberId += 1;
    return numberId;
  };
};

export { capitalize, getRandomArrayElement, getRandomInteger, createIdGenerator, getRandomIntegerArray };
