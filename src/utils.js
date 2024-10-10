import dayjs from 'dayjs';
import {DATE_FORMAT} from './const.js';

function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function getCurrentDate() {
  return dayjs.toDate();
}

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {
  getRandomArrayElement,
  getRandomNumber,
  getCurrentDate,
  humanizePointDueDate,
  updateItem,
};
