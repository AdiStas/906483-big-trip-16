import AbstractObservable from '../utils/abstract-observable';
import {UpdateType} from '../const.js';

export default class EventPointsModel extends AbstractObservable {
  #apiService = null;
  #eventPoints = [];
  #offers = [];
  #destinations = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const eventPoints = await this.#apiService.eventPoints;
      this.#eventPoints = eventPoints.map(this.#adaptToClient);
      this.#destinations = await this.#apiService.destinations;
      this.#offers = await this.#apiService.offers;
    } catch (e) {
      this.#eventPoints = [];
      this.#destinations = [];
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }

  updateEventPoint = async (updateType, update) => {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event point');
    }

    try {
      const response = await this.#apiService.updateEventPoint(update);
      const updatedEventPoint = this.#adaptToClient(response);
      this.#eventPoints = [
        ...this.#eventPoints.slice(0, index),
        updatedEventPoint,
        ...this.#eventPoints.slice(index + 1),
      ];
      this._notify(updateType, updatedEventPoint);
    } catch(err) {
      throw new Error('Can\'t update event point');
    }
  }

  addEventPoint = (updateType, update) => {
    this.#eventPoints = [
      update,
      ...this.#eventPoints,
    ];

    this._notify(updateType, update);
  }

  deleteEventPoint = (updateType, update) => {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting eventPoint');
    }

    this.#eventPoints = [
      ...this.#eventPoints.slice(0, index),
      ...this.#eventPoints.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient = (eventPoint) => {
    const adaptedEventPoint = {...eventPoint,
      dateFrom: new Date(eventPoint['date_from']),
      dateTo: new Date(eventPoint['date_to']),
      price: eventPoint['base_price'],
      isFavorite: eventPoint['is_favorite'],
    };

    delete adaptedEventPoint['date_from'];
    delete adaptedEventPoint['date_to'];
    delete adaptedEventPoint['base_price'];
    delete adaptedEventPoint['is_favorite'];

    return adaptedEventPoint;
  }
}
