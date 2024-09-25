import { CITIES, PICTURES } from './const-mock.js';

let destinationId = 0;

const getDestinationsMock = (city) => {
  const destinationsMock = {
    id: destinationId,
    name: city,
    description: `${city}, is a beautiful city, a true asian pearl, with crowded streets.`,
    pictures: [
      {
        src: PICTURES[0],
        description: `${city} parliament building`
      },
      {
        src: PICTURES[1],
        description: `${city} main square`
      },
      {
        src: PICTURES[2],
        description: `${city} best view`
      },
      {
        src: PICTURES[3],
        description: `${city} landscape`
      },
      {
        src: PICTURES[4],
        description: `${city} church`
      }
    ],
  };
  return destinationsMock;
};

const getDestinationsMockArray = () => {
  const destinationsMockArray = [];

  CITIES.forEach((city) => {
    destinationId++;
    destinationsMockArray.push(getDestinationsMock(city));
  });

  return destinationsMockArray;
};

const destinations = getDestinationsMockArray();

const getDestinations = () => destinations;

export { getDestinations };
