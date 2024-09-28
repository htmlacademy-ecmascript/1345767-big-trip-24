import {capitalize} from '../../utils/common-utils.js';
import {SortType} from '../../const.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createSortTemplate(currentSortType) {
  function getSortingItem(sorting, currentSortingType) {
    const idDisabled = (sorting === 'offer' || sorting === 'event') ? 'disabled' : '';
    const currentSorting = (sorting === currentSortingType) ? 'checked' : '';

    return `<div class="trip-sort__item  trip-sort__item--${sorting}">
      <input id="sort-${sorting}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting}" ${idDisabled} ${currentSorting}>
        <label class="trip-sort__btn" for="sort-${sorting}" data-sort-type="${sorting}">${capitalize(sorting)}</label>
    </div>`;
  }

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${Object.values(SortType).map((sorting) => getSortingItem(sorting, currentSortType)).join('')}
          </form>`;
}

export default class SortView extends AbstractView {
  #sortType = '';
  #handleSortTypeChange = null;

  constructor({sortType, onSortTypeChange}) {
    super();
    this.#sortType = sortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
