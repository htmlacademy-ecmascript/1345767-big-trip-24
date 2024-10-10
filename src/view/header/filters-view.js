import AbstractView from '../../framework/view/abstract-view.js';

const generateFilterButton = (filters, currentFilterType) => filters.map((filter) => (
  `<div class="trip-filters__filter">
      <input
        id="filter-${filter.type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter.type}"
        ${filter.type === currentFilterType ? 'checked' : ''}
        ${filter.count === 0 ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
    </div>`)).join('');

function createFiltersTemplate(filters, currentFilterType) {
  return `
    <div class="trip-main__trip-controls trip-controls">
        <div class="trip-controls__filter">
            <h2 class ="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
                ${generateFilterButton(filters, currentFilterType)}
                <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
        </div>
    </div>`;
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
