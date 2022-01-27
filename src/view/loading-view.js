import AbstractView from './abstract-view.js';

const createNoEventPointTemplate = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoEventPointTemplate();
  }
}
