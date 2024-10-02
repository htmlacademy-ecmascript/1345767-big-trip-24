import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const humanizePointDate = (pointDate, dateFormat) => pointDate ? dayjs(pointDate).format(dateFormat) : '';

const getPointDuration = (pointDateFrom, pointDateTo) => {
  const humatizedDateFrom = dayjs(pointDateFrom);
  const humatizedDateTo = dayjs(pointDateTo);

  const pointDuration = dayjs.duration(humatizedDateTo.diff(humatizedDateFrom));

  if (pointDuration.days() > 0) {
    return pointDuration.format('DD[D] HH[H] mm[M]');
  }

  if (pointDuration.hours() > 0) {
    return pointDuration.format('HH[H] mm[M]');
  }

  return pointDuration.format('mm[M]');
};

function getWeightForPrice(a, b) {
  if (a.basePrice < b.basePrice) {
    return 1;
  }

  if (a.basePrice > b.basePrice) {
    return -1;
  }

  if (a.basePrice === b.basePrice) {
    return 0;
  }
}

function getWeightForTime(a, b) {
  const pointADuration = getPointDuration(a.dateFrom, a.dateTo);
  const pointBDuration = getPointDuration(b.dateFrom, b.dateTo);

  if (pointADuration < pointBDuration) {
    return 1;
  }

  if (pointADuration > pointBDuration) {
    return -1;
  }

  if (pointADuration === pointBDuration) {
    return 0;
  }
}

const getOffersByType = (type, offers) => offers.find((offer) => offer.type === type).offers;

const getDestinationId = (destinationName, destinations) => destinations.find((destinationElement) => destinationElement.name === destinationName).id;

export { humanizePointDate, getPointDuration, getWeightForPrice, getWeightForTime, getOffersByType, getDestinationId };
