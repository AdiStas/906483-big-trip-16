import {createElement} from '../render';

const filterItems = [
  {
    name: 'everything',
    title: 'Everything',
    status: '',
  },
  {
    name: 'future',
    title: 'Future',
    status: '',
  },
  {
    name: 'past',
    title: 'Past',
    status: 'checked',
  }
];
const createFilterItems = filterItems
  .map((item) => (
    `<div class="trip-filters__filter">
      <input
        id="filter-${item.name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${item.name}"
        ${item.status}>
      <label
        class="trip-filters__filter-label"
        for="filter-${item.name}">
        ${item.title}
      </label>
    </div>`))
  .join('');
const createFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${createFilterItems}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilterTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
