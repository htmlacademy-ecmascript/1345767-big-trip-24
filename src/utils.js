import dayjs from 'dayjs';
import {DATE_FORMAT, TIME_FORMAT, FULL_DATE_FORMAT} from './const.js';

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

function formatToDate(date) {
  return dayjs(date).format(DATE_FORMAT);
}

function formatToTime(date) {
  return dayjs(date).format(TIME_FORMAT);
}

function formatToFullDate(date) {
  return dayjs(date).format(FULL_DATE_FORMAT);
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

export {
  getRandomArrayElement,
  getRandomNumber,
  getCurrentDate,
  formatToDate,
  formatToTime,
  formatToFullDate,
  humanizePointDueDate,
  isFuturePoint,
  isActualPoint,
  isExpiredPoint
};
