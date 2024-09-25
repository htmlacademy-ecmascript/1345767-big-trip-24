import { FilterType } from '../const.js';
// В приложении предусмотрено несколько фильтров:
// Everything — полный список точек маршрута;

// Future — список запланированных точек маршрута, т. е. точек, у которых дата начала события больше текущей даты;
const isPointFuture = (point) => {
  const currentDate = new Date();
  const pointDataFrom = new Date(point.dateFrom);

  return pointDataFrom > currentDate;
};

// Past — список пройденных точек маршрута, т. е. точек у которых дата окончания маршрута меньше, чем текущая.
const isPointPast = (point) => {
  const currentDate = new Date();
  const pointDataTo = new Date(point.dateTo);

  return pointDataTo < currentDate;
};

// Present — список текущих точек маршрута, т. е. точек, у которых дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты;
const isPointPresent = (point) => {
  const currentDate = new Date();
  const pointDataTo = new Date(point.dateTo);
  const pointDataFrom = new Date(point.dateFrom);

  return pointDataFrom <= currentDate && pointDataTo >= currentDate;
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
};

export { filter };
