import AbstractView from './abstract-view';


const sortItems = [
  {
    name: 'day',
    title: 'Day',
    status: 'checked',
  },
  {
    name: 'event',
    title: 'Event',
    status: 'disabled',
  },
  {
    name: 'time',
    title: 'Time',
    status: '',
  },
  {
    name: 'price',
    title: 'Price',
    status: '',
  },
  {
    name: 'offers',
    title: 'Offers',
    status: 'disabled',
  },
];
const createSortItems = sortItems
  .map((item) => (
    `<div
      class="trip-sort__item  trip-sort__item--${item.name}">
      <input
        id="sort-${item.name}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${item.name}"
        ${item.status}>
      <label
        class="trip-sort__btn"
        for="sort-${item.name}">
        ${item.title}
      </label>
    </div>`))
  .join('');

const createSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     ${createSortItems}
  </form>`
);

export default class SortingView extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
