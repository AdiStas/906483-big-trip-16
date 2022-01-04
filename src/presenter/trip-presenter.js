import {render, RenderPosition} from '../utils/render';
import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import NoEventView from '../view/no-event-view';

import EventPointPresenter from './event-point-presenter';
import {updateItem} from '../utils/common';

export default class TripPresenter {
  #tripContainer = null;

  #tripComponent = null;
  #sortComponent = new SortingView();
  #eventsListComponent = new EventsListView();
  #noEventComponent = new NoEventView()

  #eventPoints = [];
  #eventPresenter = new Map();

  constructor(tripContainer, tripComponent) {
    this.#tripContainer = tripContainer;
    this.#tripComponent = tripComponent;
  }

  init = (eventPoints) => {
    this.#eventPoints = [...eventPoints];

    render(this.#tripComponent, this.#eventsListComponent);

    this.#renderTrip();
  }

  #handleEventPointChange = (updatedEventPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedEventPoint);
    this.#eventPresenter.get(updatedEventPoint.id).init(updatedEventPoint);
  }

  #renderSort = () => {
    render(this.#tripComponent, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderEventPoint = (eventPoint) => {
    const eventPointPresenter = new EventPointPresenter(this.#eventsListComponent, this.#handleEventPointChange);
    eventPointPresenter.init(eventPoint);
    this.#eventPresenter.set(eventPoint.id, eventPointPresenter);
  }

  #renderEventPoints = () => {
    this.#eventPoints.forEach((eventPoint) => {
      this.#renderEventPoint(eventPoint);
    });
  }

  #renderNoEventPoints = () => {
    render(this.#tripComponent, this.#noEventComponent);
  }

  #clearEventPointsList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  }

  #renderEventPointsList = () => {
    this.#renderEventPoints();
  }

  #renderTrip = () => {
    this.#renderSort();
    this.#renderEventPointsList();
  }
}
