import TripInfoView from './view/header/trip-info-view.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import {render, RenderPosition} from './framework/render.js';
import FilterModel from './model/filter-model.js';

import PointsApiService from './API/points-api-service.js';

const mainPage = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const mainContainer = mainPage.querySelector('.trip-events');
const addNewPointButton = document.querySelector('.trip-main__event-add-btn');

const pointModel = new PointModel();
const filterModel = new FilterModel();

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  pointModel: pointModel,
  filterModel: filterModel,
});

const mainPresenter = new MainPresenter({
  boardContainer: mainContainer,
  pointModel: pointModel,
  filterModel: filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

addNewPointButton.addEventListener('click', handleNewPointButtonClick);

filterPresenter.init();
mainPresenter.init();

function handleNewPointFormClose() {
  addNewPointButton.disabled = false;
}

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  addNewPointButton.disabled = true;
}
