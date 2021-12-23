import {TYPES, DESTINATIONS} from '../const.js';
import {getDateByFormat} from '../utils';
import {createElement} from '../render';

const createEventTypesListTemplate = (type) => TYPES.map((item) => {
  item.checked = item.title.toLowerCase() === type.title.toLowerCase() ? 'checked' : '';
  return (`<div class="event__type-item">
      <input
        id="event-type-${item.title.toLowerCase()}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${item.title.toLowerCase()}"
        ${item.checked}>
      <label
        class="event__type-label  event__type-label--${item.title.toLowerCase()}"
        for="event-type-${item.title.toLowerCase()}-1">
        ${item.title}
      </label>
    </div>`);
}).join('');
const createEventOffersListTemplate = (offers) => {
  const availableOffers = offers.map((item) => (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${item.name}-1"
        type="checkbox"
        name="event-offer-${item.name}"
        ${item.checked}>
      <label
        class="event__offer-label"
        for="event-offer-${item.name}-1">
        <span
          class="event__offer-title">
          ${item.title}
        </span>
        &plus;&euro;&nbsp;
        <span
          class="event__offer-price">
          ${item.price}
        </span>
      </label>
    </div>`))
    .join('');

  if (offers.length > 0) {
    return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${availableOffers}
              </div>
            </section>`;
  } else {
    return '';
  }
};
const createEventDestinationsListTemplate = () => DESTINATIONS.map((item) => `<option value="${item}"></option>`).join('');
const createEventPicturesTemplate = (destination) => {
  const pictures = destination.pictures.map((item) => `<img class="event__photo" src="${item.src}" alt="Event photo">`).join('');
  if (destination.pictures.length > 0) {
    return `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures}
              </div>
            </div>`;
  } else {
    return '';
  }
};
const createEventAddTemplate = (eventPoint = {}) => {
  const {
    price = '',
    dateFrom = '',
    dateTo = '',
    destination = {
      description: '',
      name: '',
      pictures: [],
    },
    offers = [],
    type = {},
  } = eventPoint;

  const eventTypeTemplate = createEventTypesListTemplate(type);
  const eventOfferTemplate = createEventOffersListTemplate(offers);
  const eventDestinationsTemplate = createEventDestinationsListTemplate();
  const eventPictureTemplate = createEventPicturesTemplate(destination);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.title.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                          ${eventTypeTemplate}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type.title.toLowerCase()}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${eventDestinationsTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateByFormat(dateFrom, 'YY/MM/DD HH:mm')}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateByFormat(dateTo, 'YY/MM/DD HH:mm')}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${eventOfferTemplate}
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                    ${eventPictureTemplate}
                  </section>
                </section>
              </form>
  </li>`;
};

export default class EventAddView {
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
    return createEventAddTemplate(this.#eventPoint);
  }

  removeElement() {
    this.#element = null;
  }
}
