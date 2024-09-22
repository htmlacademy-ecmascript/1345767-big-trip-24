import MainBoardView from '../view/main-board/main-board-view.js';
import PointsListView from '../view/main-board/points-list-view.js';
import ListMessageView from '../view/main-board/list-message-view.js';

import {render} from '../framework/render.js';

import PointPresenter from './point-presenter.js';

export default class MainPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new MainBoardView();
  #boardListPoints = new PointsListView();

  #boardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {

    this.#boardPoints = [...this.#pointsModel.getPoints()];
    this.#renderPointsList();
  }

  #renderPointsList() {
    render(this.#boardComponent, this.#boardContainer);
    render(this.#boardListPoints, this.#boardComponent.element);

    if (this.#boardPoints.length === 0) {
      render(
        new ListMessageView({message: 'Click New Event to create your first point'}),
        this.#boardListPoints.element
      );
      return;
    }

    for (let i = 0; i < this.#boardPoints.length; i++) {
      const point = this.#boardPoints[i];
      this.#renderPoint(
        point,
        [...this.#pointsModel.getOffersById(point.type, point.offers)],
        this.#pointsModel.getDestinationById(point.destination),
        this.#pointsModel.getDestinations(),
      );
    }
  }

  #renderPoint(point, offers, destination, allDestinations) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#boardListPoints.element
    });

    pointPresenter.init(point, offers, destination, allDestinations);
  }
}
