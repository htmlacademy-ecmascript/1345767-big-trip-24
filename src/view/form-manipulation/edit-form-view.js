import {capitalize} from '../../utils/common-utils.js';
import { humanizePointDate, getOffersByType, getDestinationId } from '../../utils/point-utils.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { DATE_WITH_TIME_FORMAT, TYPES } from '../../const.js';
import { CITIES } from '../../mock/const-mock.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

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
  const modifiedDestination = destinations.find((destinationElement) => destinationElement.id === destination)?.name;
  const offersArray = offers.find((offer) => offer.type === type).offers;

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
        ${offersArray.map((pointOffer) => getPointOfferItem(pointOffer, getOfferCheckedAttribute(pointOffer.id))).join('')}
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

export default class EditFormView extends AbstractStatefulView {
  #initialPoint = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  #handleFormDelete = null;
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({point, offers, destinations, onEditClick, onFormSubmit, onCloseForm}) {
    super();
    this.#initialPoint = point;
    this._setState(EditFormView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDelete = onCloseForm;

    this._restoreHandlers();
  }

  get template() {
    return editFormTemplate(this._state, this.#offers, this.#destinations);
  }

  reset(point) {
    this.updateElement(EditFormView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if (this.#dateFromPicker) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('form').addEventListener('reset', this.#formDeleteHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#formTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#formDestinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#formPriceInputHandler);

    this.#setDateFromPicker();
    this.#setDateToPicker();
  }

  #formTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelector('.event__label').textContent = evt.target.value;

    this.updateElement(({
      type: evt.target.value,
      offers: getOffersByType(evt.target.value, this.#offers),
    }));
  };

  #formDestinationChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      destination: getDestinationId(evt.target.value, this.#destinations),
    });
  };

  #formPriceInputHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(EditFormView.parseStateToPoint(this.#initialPoint));
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick(EditFormView.parseStateToPoint(this._state));
  };

  #setDateFromPicker() {
    this.#dateFromPicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate: humanizePointDate(this._state.dateFrom, DATE_WITH_TIME_FORMAT),
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  #setDateToPicker() {
    this.#dateToPicker = flatpickr(
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
  }

  #dateFromChangeHandler = (userDate) => {
    this._setState({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = (userDate) => {
    this._setState({
      dateTo: userDate,
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
