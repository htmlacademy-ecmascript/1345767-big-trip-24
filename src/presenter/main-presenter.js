import MainBoardView from '../view/main-board/main-board-view.js';
import EditFormView from '../view/form-manipulation/edit-form-view.js';
import PointsListView from '../view/main-board/points-list-view.js';
import PointView from '../view/main-board/point-view.js';

import {render, replace} from '../framework/render.js';

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

    render(this.#boardComponent, this.#boardContainer);
    render(this.#boardListPoints, this.#boardComponent.element);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      const point = this.#boardPoints[i];
      this.#renderPoint(
        point,
        [...this.#pointsModel.getOffersById(point.type, point.offers)],
        this.#pointsModel.getDestinationById(point.destination),
      );
    }
  }

  #renderPoint(point, offers, destination) {
    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point: point,
      offers: offers,
      destination: destination,
      onClick: ()=> {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editFormPoint = new EditFormView({
      point: point,
      offers: offers,
      destination: destination,
      allDestinations: this.#pointsModel.getDestinations(),
      onFormSubmit: ()=> {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editFormPoint, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editFormPoint);
    }

    render(pointComponent, this.#boardListPoints.element);
  }
}
