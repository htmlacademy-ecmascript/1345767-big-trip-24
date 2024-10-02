import MainBoardView from '../view/main-board/main-board-view.js';
import PointsListView from '../view/main-board/points-list-view.js';
import ListMessageView from '../view/main-board/list-message-view.js';
import SortView from '../view/main-board/sort-view.js';

import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils.js';
import {SortType} from '../const.js';
import {getWeightForTime, getWeightForPrice} from '../utils/point-utils.js';

import PointPresenter from './point-presenter.js';

export default class MainPresenter {
  #boardContainer = null;
  #pointModel = null;

  #boardComponent = new MainBoardView();
  #boardListPoints = new PointsListView();

  #sortingComponent = null;
  #currentSortType = SortType.DAY;

  #points = [];
  #initialPointsLayout = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map;

  constructor({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#initialPointsLayout = [...this.#pointModel.points];
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];
    this.#renderSorting(this.#currentSortType);
    this.#renderPointsList();
  }

  #renderSorting(sortType) {
    this.#sortingComponent = new SortView({
      sortType: sortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList() {
    render(this.#boardComponent, this.#boardContainer);
    render(this.#boardListPoints, this.#boardComponent.element);

    if (this.#points.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderPoints();
  }

  #renderNoPoints() {
    render(
      new ListMessageView({message: 'Click New Event to create your first point'}),
      this.#boardListPoints.element
    );
  }

  #renderPoints() {
    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#boardListPoints.element,
      onEditPointView: this.#resetPointView,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, this.#offers, this.#destinations);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #resetPointView = (point) => {
    this.#pointPresenters.get(point.id).resetView();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id)
      .init(updatedPoint, this.#offers, this.#destinations);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.PRICE:
        this.#points.sort(getWeightForPrice);
        break;
      case SortType.TIME:
        this.#points.sort(getWeightForTime);
        break;
      default:
        this.#points = [...this.#initialPointsLayout];
    }
    this.#currentSortType = sortType;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
