import { getPoints } from '../mock/point.js';
import { getDestinations } from '../mock/destinations.js';
import { getOffers } from '../mock/offers.js';

export default class PointModel {
  #points = getPoints();
  #destinations = getDestinations();
  #offers = getOffers();

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
