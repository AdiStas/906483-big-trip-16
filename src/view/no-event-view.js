import AbstractView from './abstract-view';
import {FilterType} from '../const';

const NoEventPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createNoEventTemplate = (filterType) => {
  const noEventPointTextValue = NoEventPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">
    ${noEventPointTextValue}
    </p>`
  );
};

export default class NoEventView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoEventTemplate(this._data);
  }
}
