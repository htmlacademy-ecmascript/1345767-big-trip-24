import MainBoardView from '../view/main-board/main-board-view.js';
import CreateFormView from '../view/form-manipulation/create-form-view';
import EditFormView from '../view/form-manipulation/edit-form-view.js';
import PointsListView from '../view/main-board/points-list-view.js';
import PointView from '../view/main-board/point-view.js';

import {render} from '../render.js';

export default class MainPresenter {
  boardComponent = new MainBoardView();
  boardListPoints = new PointsListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.boardComponent, this.boardContainer);
    render(this.boardListPoints, this.boardComponent.getElement());

    render(new EditFormView({
      point: this.boardPoints[0],
      destination: this.pointsModel.getDestinationById(this.boardPoints[0].destination),
      offers: this.pointsModel.getOffersByType(this.boardPoints[1].type),
      allDestinations: this.pointsModel.getDestinations()
    }), this.boardListPoints.getElement());

    for (let i = 1; i < 6; i++) {
      const point = new PointView({
        point: this.boardPoints[i],
        offers: [...this.pointsModel.getOffersById(this.boardPoints[i].type, this.boardPoints[i].offers)],
        destination: this.pointsModel.getDestinationById(this.boardPoints[i].destination),
      });

      render(point, this.boardListPoints.getElement());
    }

    render(new CreateFormView(), this.boardComponent.getElement());
  }
}
