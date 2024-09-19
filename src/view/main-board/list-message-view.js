import AbstractView from '../../framework/view/abstract-view.js';

function createMessageTemplate(message) {
  return `
      <li>
        <p class="trip-events_msg">${message}</p>
      </li>>;
    `;
}

export default class ListMessageView extends AbstractView {
  #message = null;

  constructor({message}) {
    super();
    this.#message = message;
  }

  get template() {
    return createMessageTemplate(this.#message);
  }
}
