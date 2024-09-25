import MainBoardView from '../view/main-board/main-board-view.js';
import PointsListView from '../view/main-board/points-list-view.js';
import ListMessageView from '../view/main-board/list-message-view.js';

import {render} from '../framework/render.js';
import {updateItem} from '../utils.js';

import PointPresenter from './point-presenter.js';

export default class MainPresenter {
  #boardContainer = null;
  #pointModel = null;

  #boardComponent = new MainBoardView();
  #boardListPoints = new PointsListView();

  #points = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map;

  constructor({boardContainer, pointModel}) {
    this.#boardContainer = boardContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];
    this.#renderPointsList();
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
      onDataChange: this.#handlePointChange,
    });

    pointPresenter.init(point, this.#offers, this.#destinations);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id)
      .init(updatedPoint, this.#offers, this.#destinations);
  };
}
