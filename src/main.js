import FiltersView from './view/header/filters-view.js';
import TripInfoView from './view/header/trip-info-view.js';
import MainPresenter from './presenter/main-presenter.js';
import PointModel from './model/point-model.js';

import {generateFilter} from './mock/filters-mock.js';
import {render, RenderPosition} from './framework/render.js';

const mainPage = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const mainContainer = mainPage.querySelector('.trip-events');

const pointModel = new PointModel();
const filters = generateFilter(pointModel.points);
const mainPresenter = new MainPresenter({
  boardContainer: mainContainer,
  pointModel: pointModel,
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView({filters}), tripControlsFiltersElement);

mainPresenter.init();
