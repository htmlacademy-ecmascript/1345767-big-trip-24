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

function isActualPoint(point) {
  return point.dateTo && (dayjs().isSame(dayjs(point.dateFrom), 'minute') || dayjs().isAfter(dayjs(point.dateTo), 'milliseconds'));
}

function isExpiredPoint(point) {
  return dayjs(point.dateTo) && dayjs().isAfter(dayjs(point.dateTo), 'milliseconds');
}

function isFuturePoint(point) {
  return dayjs().isBefore(point.dateFrom, 'minute');
}

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {
  getRandomArrayElement,
  getRandomNumber,
  getCurrentDate,
  humanizePointDueDate,
  isFuturePoint,
  isActualPoint,
  isExpiredPoint,
  updateItem,
};
