import AbstractView from './abstract-view';
import {filter} from '../utils/filter';

const createFilterItemTemplate = (filterItem, currentFilterType, eventPoints) => {
  if (eventPoints.length === 0) {
    return;
  }

  const {type, name} = filterItem;
  const isDisabled = filter[filterItem.type]([...eventPoints]).length;
  return (
    `<div class="trip-filters__filter">
       <input
         id="filter-${name}"
         class="trip-filters__filter-input  visually-hidden"
         type="radio"
         name="trip-filter"
         ${!isDisabled ? 'disabled' : ''}
         ${type === currentFilterType ? 'checked' : ''}
         value="${type}">
       <label
         class="trip-filters__filter-label"
         for="filter-${name}">
         ${name}
       </label>
     </div>`
  );
};
const createFilterTemplate = (filterItems, currentFilterType, eventPoints) => {
  const filterItemsTemplate = filterItems
    .map((filterItem) => createFilterItemTemplate(filterItem, currentFilterType, eventPoints))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
            ${filterItemsTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #eventPoints = null;

  constructor(filters, currentFilterType, eventPoints) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#eventPoints = eventPoints;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter, this.#eventPoints);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
