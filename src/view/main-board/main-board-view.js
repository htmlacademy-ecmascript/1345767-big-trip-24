import AbstractView from '../../framework/view/abstract-view.js';

function createBoardViewTemplate() {
  return `
    <section class="trip-events">
        <h2 class="visually-hidden">Trip events</h2>
    </section>
    `;
}

export default class MainBoardView extends AbstractView {
  get template() {
    return createBoardViewTemplate();
  }
}
