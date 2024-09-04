import MainBoardView from '../view/main-board/main-board-view.js';
import CreateFormView from '../view/form-manipulation/create-form-view';
import EditFormView from '../view/form-manipulation/edit-form-view.js';
import PointsListView from '../view/main-board/points-list-view.js';
import PointView from '../view/main-board/point-view.js';

import {render, RenderPosition} from '../render.js';

export default class MainPresenter {
  boardComponent = new MainBoardView();
  boardListPoints = new PointsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(this.boardListPoints, this.boardComponent.getElement());
    render(new EditFormView(), this.boardListPoints.getElement());
    for (let i = 1; i <= 3; i++) {
      render(new PointView(), this.boardListPoints.getElement());
    }

    render(new CreateFormView(), this.boardComponent.getElement());
  }

}
