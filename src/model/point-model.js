import {getRandomPoint} from '../mock/point.js';
import {mockDestinations} from '../mock/destinations.js';
import {mockOffers} from '../mock/offers.js';

const POINTS_COUNT = 10;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getDestinationById(id) {
    const allDestinations = this.getDestinations();
    return allDestinations.find((item) => item.id === id);
  }

  getOffersByType(type) {
    const allOffers = this.getOffers();
    return allOffers.find((item) => item.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }
}
