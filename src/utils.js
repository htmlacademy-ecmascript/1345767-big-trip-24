function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {getRandomArrayElement, getRandomNumber};
