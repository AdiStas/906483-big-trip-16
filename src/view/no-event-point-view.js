import AbstractView from './abstract-view';
// Значение отображаемого текста зависит от выбранного фильтра:
//   * Everthing – 'Click New Event to create your first point'
//   * Past — 'There are no past events now';
//   * Future — 'There are no future events now'.
//

const createNoEventPointTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoEventPointView extends AbstractView {
  get template() {
    return createNoEventPointTemplate();
  }
}
