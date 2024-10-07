import {FilterType} from './const.js';

// Future — список запланированных точек маршрута, т. е. точек, у которых дата начала события больше текущей даты;
const isPointFuture = (point) => {
  const currentDate = new Date();
  const pointDateFrom = new Date(point.dateFrom);

  return pointDateFrom > currentDate;
};

// Past — список пройденных точек маршрута, т. е. точек у которых дата окончания маршрута меньше, чем текущая.
const isPointPast = (point) => {
  const currentDate = new Date();
  const pointDateTo = new Date(point.dateTo);
  return pointDateTo < currentDate;
};

// Present — список текущих точек маршрута, т. е. точек, у которых дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты;
const isPointPresent = (point) => {
  const currentDate = new Date();
  const pointDateTo = new Date(point.dateTo);
  const pointDateFrom = new Date(point.dateFrom);

  return pointDateFrom <= currentDate && pointDateTo >= currentDate;
};

const Filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

export {Filter};
