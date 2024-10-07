import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {getDestinationId, getOffersByType, humanizePointDate, toggleOffers} from '../../utils/point-utils.js';
import {DATE_WITH_TIME_FORMAT, TYPES} from '../../const.js';
import {capitalize, getRandomArrayElement, getRandomInteger} from '../../utils/common-utils.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {CITIES, DATES} from '../../mock/const-mock';

const BLANK_POINT = {
  type: 'flight',
  destination: 5,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  dateFrom: getRandomArrayElement(DATES).dateFrom,
  dateTo: getRandomArrayElement(DATES).dateTo,
  basePrice: getRandomInteger(20, 5000),
  offers: [2, 1],
  isFavorite: false,
};

const createOfferClass = (offerTitle) => {
  const splittedOfferTitles = offerTitle.split(' ');
  return splittedOfferTitles[splittedOfferTitles.length - 1];
};

const createDestinationsList = (destination) =>
  `<option value="${destination}"></option>`;

const createPointTypeItem = (pointType, pointTypeChecked) => `
  <div class="event__type-item">
  <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointTypeChecked}>
  <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalize(pointType)}</label>
  </div>`;

const getPointOfferItem = (pointOffer, pointOfferChecked) => `<div class="event__offer-${createOfferClass(pointOffer.title)}">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${createOfferClass(pointOffer.title)}-1" type="checkbox" name="event-offer-${createOfferClass(pointOffer.title)}" ${pointOfferChecked}>
  <label class="event__offer-label" for="event-offer-${createOfferClass(pointOffer.title)}-1">
    <span class="event__offer-title">${pointOffer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${pointOffer.price}</span>
  </label>
  </div>`;

function editFormTemplate(point, offers, destinations) {
  const { type, destination, dateFrom, dateTo, basePrice, description, offers: pointOffers } = point;
  const modifiedDestination = destinations.find((destinationElement) => destinationElement.id === destination).name;
  const offersArray = offers.offers;

  const getOfferCheckedAttribute = (offerId) => {
    if (pointOffers.includes(offerId)) {
      return 'checked';
    } else {
      return '';
    }
  };

  const getTypeCheckedAttribute = (pointType) => {
    if (pointType === type) {
      return 'checked';
    } else {
      return '';
    }
  };

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${TYPES.map((pointType) => createPointTypeItem(pointType, getTypeCheckedAttribute(pointType))).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${modifiedDestination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${CITIES.map((city) => createDestinationsList(city)).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDate(dateFrom, DATE_WITH_TIME_FORMAT)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDate(dateTo, DATE_WITH_TIME_FORMAT)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offersArray?.map((pointOffer) => getPointOfferItem(pointOffer, getOfferCheckedAttribute(pointOffer.id))).join('')}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>
      </section>
    </section>
  </form>
</li>`;
}


export default class CreatePointFormView extends AbstractStatefulView {
  #allOffers = null;
  #allDestinations = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleEditClick = null;
  #startDatepicker = null;
  #endDatepicker = null;

  constructor({point = BLANK_POINT, allOffers, allDestinations, onEditClick, onFormSubmit, onDeleteClick}) {
    super();
    this._setState(CreatePointFormView.parsePointToState(point));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this. _restoreHandlers();
  }

  get template() {
    return editFormTemplate(this._state, this.#allOffers, this.#allDestinations);
  }

  reset(point) {
    this.updateElement(CreatePointFormView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#pointOfferClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#pointDestinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#formPriceInputHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }

  #pointTypeClickHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelector('.event__label').textContent = evt.target.value;

    this.updateElement(({
      type: evt.target.value,
      offers: getOffersByType(evt.target.value, this.#allOffers),
    }));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(CreatePointFormView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(CreatePointFormView.parseStateToPoint(this._state));
  };

  #pointOfferClickHandler = (evt) => {
    evt.preventDefault();
    const labelElement = evt.target.closest('.event__offer-label');
    if(labelElement) {
      const offerActive = labelElement.dataset.id;
      const offers = [...this._state.offers];
      this.updateElement({
        offers: toggleOffers(offers, offerActive),
      });
    }
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: getDestinationId(evt.target.value, this.#allDestinations),
    });
  };

  #formPriceInputHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: humanizePointDate(this._state.dateFrom, DATE_WITH_TIME_FORMAT),
        onChange: this.#dateFromChangeHandler,
      }
    );
  };

  #setEndDatepicker = () => {
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        minDate: humanizePointDate(this._state.dateFrom, DATE_WITH_TIME_FORMAT),
        defaultDate: humanizePointDate(this._state.dateTo, DATE_WITH_TIME_FORMAT),
        onChange: this.#dateToChangeHandler,
      }
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement(
      {dateFrom: userDate,}
    );
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement(
      { dateTo: userDate,}
    );
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
