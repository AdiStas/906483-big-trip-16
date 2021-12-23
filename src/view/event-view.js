import {getDateByFormat, calculateDatesDiff} from '../utils';
import {createElement} from '../render';

const createEventOffersTemplate = (offers) => offers.map((item) => (
  `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>`
)).join('');

const createEventTemplate = (eventPoint) => {
  const {
    price,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type,
  } = eventPoint;
  const offersList = createEventOffersTemplate(offers);
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getDateByFormat(dateFrom,'YYYY-MM-DD')}">${getDateByFormat(dateFrom,'MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.title.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.title} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDateByFormat(dateFrom,'YYYY-MM-DDTHH:mm')}">${getDateByFormat(dateFrom,'HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${getDateByFormat(dateTo,'YYYY-MM-DDTHH:mm')}">${getDateByFormat(dateTo,'HH:mm')}</time>
          </p>
          <p class="event__duration">${calculateDatesDiff(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
  </li>`
  );
};

export default class EventView {
  #element = null;
  #eventPoint = null;

  constructor(eventPoint) {
    this.#eventPoint = eventPoint;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEventTemplate(this.#eventPoint);
  }

  removeElement() {
    this.#element = null;
  }
}
