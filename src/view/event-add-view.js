const eventTypes = [
  {
    name: 'taxi',
    title: 'Taxi',
    checked: '',
  },
  {
    name: 'bus',
    title: 'Bus',
    checked: '',
  },
  {
    name: 'train',
    title: 'Train',
    checked: '',
  },
  {
    name: 'ship',
    title: 'Ship',
    checked: '',
  },
  {
    name: 'drive',
    title: 'Drive',
    checked: '',
  },
  {
    name: 'flight',
    title: 'Flight',
    checked: 'checked',
  },
  {
    name: 'check-in',
    title: 'Check-in',
    checked: '',
  },
  {
    name: 'sightseeing',
    title: 'Sightseeing',
    checked: '',
  },
  {
    name: 'restaurant',
    title: 'Restaurant',
    checked: '',
  },
];
const eventOfferSelectors = [
  {
    name: 'luggage',
    title: 'Add luggage',
    checked: 'checked',
    price: '50',
  },
  {
    name: 'comfort',
    title: 'Switch to comfort',
    checked: 'checked',
    price: '80',
  },
  {
    name: 'meal',
    title: 'Add meal',
    checked: '',
    price: '15',
  },
  {
    name: 'seats',
    title: 'Choose seats',
    checked: '',
    price: '5',
  },
  {
    name: 'train',
    title: 'Travel by train',
    checked: '',
    price: '40',
  },
];
const eventPhotos = ['1', '2', '3', '4', '5'];

const createEventItems = eventTypes
  .map((item) => (
    `<div class="event__type-item">
      <input
        id="event-type-${item.name}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${item.name}"
        ${item.checked}>
      <label
        class="event__type-label  event__type-label--${item.name}"
        for="event-type-${item.name}-1">
        ${item.title}
      </label>
    </div>`))
  .join('');

const createEventOfferSelectors = eventOfferSelectors
  .map((item) => (
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

const createEventPhotos = eventPhotos
  .map((item ) => (
    `<img class="event__photo" src="img/photos/${item}.jpg" alt="Event photo">`
  ))
  .join('');
export const createEventAddTemplate = () => (
  `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                          ${createEventItems}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${createEventOfferSelectors}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createEventPhotos}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`
);
