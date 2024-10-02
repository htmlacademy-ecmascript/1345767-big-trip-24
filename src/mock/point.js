import { getRandomArrayElement, getRandomInteger, createIdGenerator } from '../utils/common-utils.js';
import { CITIES, DESCRIPTION_TEXT, DATES } from './const-mock.js';
import { TYPES } from '../const.js';
import { getOffers } from './offers.js';

const POINTS_COUNT = 10;
const offersData = getOffers();

const getRandomDescriptionPoint = (text) => {
  const descriptionsArray = text.split('.');
  const randomDescriptionText = Array.from({ length: 5 }, () => getRandomArrayElement(descriptionsArray).trim()).join('.');
  return randomDescriptionText;
};

const generateRandomPointId = createIdGenerator();

const createPointMock = () => {
  const pointDate = getRandomArrayElement(DATES);
  const pointType = getRandomArrayElement(TYPES);

  const getRandomOffers = () => {
    const typeOffers = offersData.find((offer) => offer.type === pointType).offers;

    const typeOffersKeys = [];

    typeOffers.forEach((offer) => {
      typeOffersKeys.push(offer.id);
    });

    const pointOffers = typeOffersKeys.slice(0, getRandomInteger(1, typeOffersKeys.length));

    return pointOffers;
  };

  const getRandomFavoriteAtribute = () => {
    const result = getRandomInteger(0, 1);
    return result === 0;
  };

  const pointMock = {
    id: generateRandomPointId(),
    type: pointType,
    destination: getRandomInteger(1, CITIES.length),
    description: getRandomDescriptionPoint(DESCRIPTION_TEXT),
    dateFrom: pointDate.dateFrom,
    dateTo: pointDate.dateTo,
    basePrice: getRandomInteger(20, 5000),
    offers: getRandomOffers(),
    isFavorite: getRandomFavoriteAtribute()
  };

  return pointMock;
};

const getPointMocks = () => Array.from({ length: POINTS_COUNT }, () => createPointMock());

const points = getPointMocks();

const getPoints = () => points;

export { getPoints };
