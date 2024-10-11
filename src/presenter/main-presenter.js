import {remove, render, RenderPosition} from '../framework/render.js';
import {FilterType, SortType, UPDATE_TYPE, USER_ACTION} from '../const.js';
import {getWeightForTime, getWeightForPrice} from '../utils/point-utils.js';
import {filter} from '../utils/filter-utils.js';

import MainBoardView from '../view/main-board/main-board-view.js';
import PointsListView from '../view/main-board/points-list-view.js';
import SortView from '../view/main-board/sort-view.js';

import PointPresenter from './point-presenter.js';
import NoPointView from '../view/main-board/no-points-text-type';
import NewPointPresenter from './new-point-presenter.js';

export default class MainPresenter {
  #boardContainer = null;
  #pointModel = null;
  #filterModel = null;

  #boardComponent = new MainBoardView();
  #boardListPoints = new PointsListView();

  #sortingComponent = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #noPointComponent = null;
  #newPointPresenter = null;

  #destinations = [];
  #offers = [];
  #pointPresenters = new Map;

  constructor({boardContainer, pointModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#boardContainer,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
    this.#offers = this.offers;
    this.#destinations = this.destinations;
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(getWeightForPrice);
      case SortType.TIME:
        return filteredPoints.sort(getWeightForTime);
    }
    return filteredPoints;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  get offers() {
    return this.#pointModel.offers;
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTION.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case USER_ACTION.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case USER_ACTION.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.#offers, this.#destinations);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UPDATE_TYPE.INIT:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #resetPointView = (point) => {
    this.#pointPresenters.get(point.id).resetView();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderSorting() {
    this.#sortingComponent = new SortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);
    render(this.#boardListPoints, this.#boardComponent.element);

    this.#renderSorting();

    if (this.points.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderPoints();
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({filterType: this.#filterType});
    render(this.#noPointComponent, this.#boardListPoints.element);
  }

  #renderPoints() {
    for (const point of this.points) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#boardListPoints.element,
      onEditPointView: this.#resetPointView,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, this.offers, this.destinations);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
