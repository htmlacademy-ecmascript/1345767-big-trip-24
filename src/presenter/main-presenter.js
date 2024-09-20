import MainBoardView from '../view/main-board/main-board-view.js';
import EditFormView from '../view/form-manipulation/edit-form-view.js';
import PointsListView from '../view/main-board/points-list-view.js';
import PointView from '../view/main-board/point-view.js';
import ListMessageView from '../view/main-board/list-message-view.js';

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
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseForm: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToForm() {
      replace(editFormPoint, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editFormPoint);
    }

    render(pointComponent, this.#boardListPoints.element);
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.boardComponent, this.boardContainer);
    render(this.boardListPoints, this.boardComponent.element);

    render(new EditFormView({
      point: this.boardPoints[0],
      destination: this.pointsModel.getDestinationById(this.boardPoints[0].destination),
      offers: this.pointsModel.getOffersByType(this.boardPoints[1].type),
      allDestinations: this.pointsModel.getDestinations()
    }), this.boardListPoints.element);

    for (let i = 1; i < 6; i++) {
      const point = new PointView({
        point: this.boardPoints[i],
        offers: [...this.pointsModel.getOffersById(this.boardPoints[i].type, this.boardPoints[i].offers)],
        destination: this.pointsModel.getDestinationById(this.boardPoints[i].destination),
      });

      render(point, this.boardListPoints.element);
    }

    render(new CreateFormView(), this.boardComponent.element);
  }
}
