import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

import PointsApiService from './API/points-api-service.js';
const AUTHORIZATION = 'Basic lantsovR1345767';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const mainPage = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const mainContainer = mainPage.querySelector('.trip-events');
const addNewPointButton = document.querySelector('.trip-main__event-add-btn');

const pointModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  pointModel: pointModel,
  filterModel: filterModel,
});

const tripInfoPresenter = new TripInfoPresenter({
  pointsModel: pointModel,
  header: tripMainElement
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
pointModel.init();
tripInfoPresenter.init();

function handleNewPointFormClose() {
  addNewPointButton.disabled = false;
}

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  addNewPointButton.disabled = true;
}
