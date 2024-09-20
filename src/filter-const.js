import {isActualPoint, isExpiredPoint, isFuturePoint} from './utils.js';

const FiltersPoint = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filters = {
  [FiltersPoint.EVERYTHING]: (points) => points,
  [FiltersPoint.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FiltersPoint.PRESENT]: (points) => points.filter((point) => isActualPoint(point)),
  [FiltersPoint.PAST]: (points) => points.filter((point) => isExpiredPoint(point)),
};

export {FiltersPoint, filters};
