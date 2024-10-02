import { OFFERS } from './const-mock';
import { TYPES } from '../const';
import { getRandomInteger, getRandomIntegerArray } from '../utils/common-utils.js';

const getOffersArrayFromPoints = (offersIdArray) => {
  const offersArray = [];

  offersIdArray.forEach((offerId) => {
    const offerElement = OFFERS.find((offer) => offer.id === offerId);
    offersArray.push(offerElement);
  });

  return offersArray;
};

const getOfferMock = (type, offersIdArray) => {
  const offerMock = {
    type: type,
    offers: getOffersArrayFromPoints(offersIdArray)
  };

  return offerMock;
};

const getOfferMocks = () => {
  const offers = [];

  TYPES.forEach((type) => {
    const randomIntegerArray = getRandomIntegerArray(1, getRandomInteger(1, OFFERS.length));
    const offer = getOfferMock(type, randomIntegerArray);
    offers.push(offer);
  });

  return offers;
};

const offerMocks = getOfferMocks();

const getOffers = () => offerMocks;

export { getOffers };
