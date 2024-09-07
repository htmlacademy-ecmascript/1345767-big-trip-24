import {getRandomArrayElement, getRandomNumber} from '../utils.js';
import {TRAVEL_POINTS} from '../const.js';

const mockOffers = [
  {
    type: getRandomArrayElement(TRAVEL_POINTS),
    name: 'Eat',
    price: 320,
  },
  {
    type: getRandomArrayElement(TRAVEL_POINTS),
    name: 'Walk',
    price: 500,
  },
  {
    type: getRandomArrayElement(TRAVEL_POINTS),
    name: 'Dream',
    price: 190,
  },
];

const mockDestinations = [
  {
    description: 'What what',
    cityName: 'Moscow',
    picture: `https://loremflickr.com/248/152?${getRandomNumber(10)}`,
  },
  {
    description: 'say common',
    cityName: 'Paris',
    picture: `https://loremflickr.com/248/152?${getRandomNumber(10)}`,
  },
  {
    description: 'whatever',
    cityName: 'New-York',
    picture: `https://loremflickr.com/248/152?${getRandomNumber(10)}`,
  },
];

const mockPoints = [
  {
    pointsType: getRandomArrayElement(TRAVEL_POINTS),
    destination: getRandomArrayElement(mockDestinations),
    offers: getRandomArrayElement(mockOffers),
    timeAndDateStart: '25/12/19 16:00',
    timeAndDateEnd: '08/01/20 12:00',
    price: 5200,
  },
  {
    pointsType: getRandomArrayElement(TRAVEL_POINTS),
    destination: getRandomArrayElement(mockDestinations),
    offers: getRandomArrayElement(mockOffers),
    timeAndDateStart: '25/12/19 16:00',
    timeAndDateEnd: '08/01/20 12:00',
    price: 7500,
  },
  {
    pointsType: getRandomArrayElement(TRAVEL_POINTS),
    destination: getRandomArrayElement(mockDestinations),
    offers: getRandomArrayElement(mockOffers),
    timeAndDateStart: '25/12/19 16:00',
    timeAndDateEnd: '08/01/20 12:00',
    price: 4100,
  },
  {
    pointsType: getRandomArrayElement(TRAVEL_POINTS),
    destination: getRandomArrayElement(mockDestinations),
    offers: getRandomArrayElement(mockOffers),
    timeAndDateStart: '25/12/19 16:00',
    timeAndDateEnd: '08/01/20 12:00',
    price: 13500,
  },
  {
    pointsType: getRandomArrayElement(TRAVEL_POINTS),
    destination: getRandomArrayElement(mockDestinations),
    offers: getRandomArrayElement(mockOffers),
    timeAndDateStart: '25/12/19 16:00',
    timeAndDateEnd: '08/01/20 12:00',
    price: 2500,
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
