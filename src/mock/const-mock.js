import { getRandomInteger } from '../utils/common-utils.js';

const CITIES = ['Amsterdam', 'Geneva', 'Chamonix', 'Basel', 'Düsseldorf', 'Strasbourg'];
const DESCRIPTION_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const PICTURES = [
  `https://loremflickr.com/248/152?random=${getRandomInteger(1, 5)}`,
  `https://loremflickr.com/248/152?random=${getRandomInteger(1, 5)}`,
  `https://loremflickr.com/248/152?random=${getRandomInteger(1, 5)}`,
  `https://loremflickr.com/248/152?random=${getRandomInteger(1, 5)}`,
  `https://loremflickr.com/248/152?random=${getRandomInteger(1, 5)}`
];

const DATES = [
  {
    dateFrom: '2024-10-10T10:00:00',
    dateTo: '2024-10-11T11:00:00',
  },
  {
    dateFrom: '2024-07-15T18:00:00',
    dateTo: '2024-07-16T20:30:00',
  },
  {
    dateFrom: '2024-07-16T21:00:00',
    dateTo: '2024-07-16T23:45:00',
  },
  {
    dateFrom: '2024-08-01T09:55:00',
    dateTo: '2024-08-02T11:22:00',
  },
  {
    dateFrom: '2024-08-10T14:00:00',
    dateTo: '2024-08-10T17:00:00',
  },
  {
    dateFrom: '2024-08-12T13:56:00',
    dateTo: '2024-08-12T14:06:00',
  },
];

const OFFERS = [
  {
    id: 1,
    title: 'Add luggage',
    price: getRandomInteger(5, 200)
  },
  {
    id: 2,
    title: 'Switch to comfort',
    price: getRandomInteger(5, 200)
  },
  {
    id: 3,
    title: 'Add meal',
    price: getRandomInteger(5, 200)
  },
  {
    id: 4,
    title: 'Choose seats',
    price: getRandomInteger(5, 200)
  },
  {
    id: 5,
    title: 'Order Uber',
    price: getRandomInteger(5, 200)
  },
  {
    id: 6,
    title: 'Add breakfast',
    price: getRandomInteger(5, 200)
  },
  {
    id: 7,
    title: 'Rent a car',
    price: getRandomInteger(5, 200)
  },
];

export { CITIES, DESCRIPTION_TEXT, PICTURES, DATES, OFFERS };
