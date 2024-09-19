import AbstractView from '../../framework/view/abstract-view.js';

const FILTER_TYPES = ['everything', 'future', 'present', 'past'];

const generateFilterButton = (filters) => filters.map((filter) => (
  `<div class="trip-filters__filter">
      <input
        id="filter-${filter.type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter.type}"
        ${filter.type === FiltersPoint.EVERYTHING ? 'checked' : ''}
        ${filter.count === 0 ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-everything">${filter.type}</label>
    </div>`)).join('');

function createFiltersTemplate(filters) {
  return `
    <div class="trip-main__trip-controls trip-controls">
        <div class="trip-controls__filter">
            <h2 class ="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
                ${generateFilterButton(filters)}
                <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
        </div>
    </div>`;
}

export default class FiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
