import EditFormView from '../view/form-manipulation/edit-form-view.js';
import PointView from '../view/main-board/point-view.js';
import {render, replace} from '../framework/render';

export default class PointPresenter {
  #pointsListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = null;
  #destination = null;
  #allDestinations = null;

  constructor({pointsListContainer}) {
    this.#pointsListContainer = pointsListContainer;
  }

  init(point, offers, destination, allDestinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#allDestinations = allDestinations;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      onClick: ()=> {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointEditComponent = new EditFormView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destination,
      allDestinations: this.#allDestinations,
      onFormSubmit: ()=> {
        this.#replaceFormToPoint();
      },
      onCloseForm: () => {
        this.#replaceFormToPoint();
      },
    });

    render(this.#pointComponent, this.#pointsListContainer);
  }

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
