import FiltersView from './view/header/filters-view.js';
import SortView from './view/main-board/sort-view.js';
import TripInfoView from './view/header/trip-info-view.js';
import MainPresenter from './presenter/main-presenter.js';

import {render, RenderPosition} from './render.js';

const mainPage = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const mainContainer = mainPage.querySelector('.trip-events');
const mainPresenter = new MainPresenter({boardContainer: mainContainer});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripControlsFiltersElement);
render(new SortView(), tripEventsElement);

mainPresenter.init();


