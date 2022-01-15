import AbstractObservable from '../src/utils/abstract-observable';

export default class EventPointsModel extends AbstractObservable {
  #eventPoints = [];

  set eventPoints(eventPoints) {
    this.#eventPoints = [...eventPoints];
  }

  get eventPoints() {
    return this.#eventPoints;
  }

  updateEventPoint = (updateType, update) => {
    const index = this.#eventPoints.findIndex((eventPoint) => eventPoint.id === eventPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting eventPoint');
    }

    this.#eventPoints = [
      ...this.#eventPoints.slice(0, index),
      update,
      ...this.#eventPoints.slice(index + 1),
    ];

    this._notify(updateType, update);
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
}
