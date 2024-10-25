import AbstractView from '../../framework/view/abstract-view.js';
import { humanizePointDate } from '../../utils/point-utils.js';
const MAX_DESTINATIONS_TITLE = 3;

function getTripPrice(points, allOffers) {
  let basePricePoints = 0;
  let offersPrice = 0;

  points.forEach((point) => {
    basePricePoints = basePricePoints + Number(point.basePrice);

    const offersPoint = allOffers.find((offer) => offer.type === point.type).offers;
    point.offers.forEach((offerId) => {
      offersPrice = offersPrice + offersPoint.find((offerPoint) => offerPoint.id === offerId).price;
    });
  });

  return basePricePoints + offersPrice;
}

function createTripInfoTemplate(points, allDestinations, allOffers) {
  const destinationsPoint = points.map((point) => allDestinations.find((destination) => destination.id === point.destination).name);
  const title = destinationsPoint.length > MAX_DESTINATIONS_TITLE ? `${destinationsPoint[0]}-${destinationsPoint[destinationsPoint.length - 1]}` : `${destinationsPoint.join('-')}`;
  const duration = `${humanizePointDate(points[0].dateFrom)} - ${humanizePointDate(points[points.length - 1].dateTo)}`;
  const tripPrice = getTripPrice(points, allOffers);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>

              <p class="trip-info__dates">${duration}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
            </p>
          </section>`;
}

export default class TripInfoView extends AbstractView{
  #points = [];

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.destinations = destinations;
    this.offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.destinations, this.offers);
  }
}
