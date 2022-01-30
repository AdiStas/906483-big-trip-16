import {TYPES} from '../const.js';
import {getDateByFormat} from '../utils/common';
import SmartView from './smart-view';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEventTypesListTemplate = (type) => TYPES.map((item) => {
  const checked = item.toLowerCase() === type.toLowerCase() ? 'checked' : '';
  return (`<div class="event__type-item">
      <input
        id="event-type-${item.toLowerCase()}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${item.toLowerCase()}"
        ${checked}>
      <label
        class="event__type-label  event__type-label--${item.toLowerCase()}"
        for="event-type-${item.toLowerCase()}-1">
        ${item}
      </label>
    </div>`);
}).join('');
const createEventOffersListTemplate = (type, offers, defaultOffers) => {
  const offersFilteredByType = defaultOffers.find((item) => item.type === type).offers;
  const availableOffers = offersFilteredByType.map((item) => {
    const checked = offers.some((i) => i.title === item.title) ? 'checked' : '';
    return (`<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${item.title.toLowerCase()}-1"
        type="checkbox"
        name="event-offer-${item.title.toLowerCase()}"
        ${checked}>
      <label
        class="event__offer-label"
        for="event-offer-${item.title.toLowerCase()}-1">
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
    </div>`);
  })
    .join('');

  if (availableOffers.length > 0) {
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
const createEventDestinationOptionsTemplate = (destinationsList) => destinationsList.map((item) => `<option value="${item.name}"></option>`).join('');
const createEventPicturesTemplate = (destination) => {
  if (destination.pictures.length > 0) {
    const pictures = destination.pictures.map((item) => `<img class="event__photo" src="${item.src}" alt="Event photo">`).join('');
    return `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures}
              </div>
            </div>`;
  } else {
    return '';
  }
};
const createEventDestinationTemplate = (destination) => {
  if (destination.description) {
    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destination.description}</p>
              ${createEventPicturesTemplate(destination)}
           </section>`;
  } else {
    return '';
  }
};
export const createEventEditTemplate = (eventPoint = {}, destinationsList, defaultOffers) => {
  const {
    price,
    dateFrom,
    dateTo,
    destination,
    offers,
    type,
  } = eventPoint;

  const eventTypeTemplate = createEventTypesListTemplate(type);
  const eventOfferTemplate = createEventOffersListTemplate(type, offers, defaultOffers);
  const eventDestinationOptionsTemplate = createEventDestinationOptionsTemplate(destinationsList);
  const eventDestinationTemplate = createEventDestinationTemplate(destination);
  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
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
                      ${type.toLowerCase()}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${eventDestinationOptionsTemplate}
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
                  ${eventDestinationTemplate}
                </section>
              </form>
  </li>`;
};

export default class EventEditView extends SmartView {
  #datepickerDateFrom = null;
  #datepickerDateTo = null;

  constructor(eventPoint, destinations, offers) {
    super();
    this._data = EventEditView.parseEventPointToData(eventPoint);
    this._destinations = destinations;
    this._offers = offers;

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createEventEditTemplate(this._data, this._destinations, this._offers);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerDateFrom) {
      this.#datepickerDateFrom.destroy();
      this.#datepickerDateFrom = null;
    }

    if (this.#datepickerDateTo) {
      this.#datepickerDateTo.destroy();
      this.#datepickerDateTo = null;
    }
  }

  reset = (eventPoint) => {
    this.updateData(
      EventEditView.parseEventPointToData(eventPoint),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditCloseClickHandler(this._callback.formClose);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  setEditCloseClickHandler = (callback) => {
    this._callback.formClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editCloseClickHandler);
  }

  #setDatepicker = () => {
    this.#datepickerDateFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'y/m/d H:i',
        enableTime: true,
        'time_24hr': true,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#datepickerDateTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'y/m/d H:i',
        enableTime: true,
        'time_24hr': true,
        'disable': [
          (date) => date.getTime() < dayjs(this._data.dateFrom).subtract(1, 'day'),
        ],
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #setInnerHandlers = () => {
    const eventTypeList = this.element.querySelector('.event__type-list');
    eventTypeList.querySelectorAll('.event__type-input').forEach((item) => {
      item.addEventListener('click', this.#eventPointTypeChangeHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  }

  #eventPointTypeChangeHandler = (evt) => {
    const eventType = evt.target.value;
    this.updateData({
      type: eventType,
    });
    createEventOffersListTemplate(eventType, [], this._offers);
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    },true);
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    },true);
  }

  #offerChangeHandler = () => {
    this.updateData({
      offers: [],
    });
  }

  #destinationChangeHandler = (evt) => {
    let destinationName = evt.target.value;
    if (!destinationName) {
      return;
    }

    const value = this._destinations.some((item) => item.name === evt.target.value);
    if (!value) {
      destinationName = this._destinations[0].name;
    }

    this.updateData({
      destination: {
        name: destinationName,
        description: this._destinations.find((item) => item.name === destinationName).description,
        pictures: this._destinations.find((item) => item.name === destinationName).pictures,
      }
    });
  }

  #priceChangeHandler= (evt) => {
    const value = evt.target.value.replace(/[^0-9]/g, '');
    this.updateData({
      price: Number(value),
    }, true);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EventEditView.parseDataToEventPoint(this._data));
  }

  #editCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.formClose();
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EventEditView.parseDataToEventPoint(this._data));
  }

  static parseEventPointToData = (eventPoint) => ({...eventPoint});
  static parseDataToEventPoint = (data) => ({...data});
}
