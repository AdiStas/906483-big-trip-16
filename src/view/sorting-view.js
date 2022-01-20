import AbstractView from './abstract-view';
import {SortType} from '../const';

const sortItems = [
  {
    name: 'day',
    status: 'checked',
    type: SortType.DAY,
  },
  {
    name: 'event',
    status: 'disabled',
    type: null,
  },
  {
    name: 'time',
    status: '',
    type: SortType.TIME,
  },
  {
    name: 'price',
    status: '',
    type: SortType.PRICE
  },
  {
    name: 'offers',
    status: 'disabled',
    type: null,
  },
];

const createSortTemplate = (currentSortType) => {
  const items = sortItems.map((item) => {
    const sortAttribute = item.type ? `data-sort-type='${item.type}'` : '';

    return `<div
      class="trip-sort__item  trip-sort__item--${item.name}">
      <input
        id="sort-${item.name}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${item.name}"
        ${sortAttribute}
        ${item.status}
        ${currentSortType === item.type ? 'checked' : ''}>
      <label
        class="trip-sort__btn"
        for="sort-${item.name}">
        ${item.name}
      </label>
      </div>`;
  }).join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     ${items}
  </form>`;
};

export default class SortingView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
