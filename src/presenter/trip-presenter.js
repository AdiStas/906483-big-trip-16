import {render, RenderPosition} from '../utils/render';
import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import NoEventPointView from '../view/no-event-point-view';

import EventPointPresenter from './event-point-presenter';

export default class TripPresenter {
  #tripContainer = null;

  #tripComponent = null;
  #sortComponent = new SortingView();
  #eventsListComponent = new EventsListView();
  #noEventPointComponent = new NoEventPointView()

  #eventPoints = [];

  constructor(tripContainer, tripComponent) {
    this.#tripContainer = tripContainer;
    this.#tripComponent = tripComponent;
  }

  init = (eventPoints) => {
    this.#eventPoints = [...eventPoints];

    render(this.#tripComponent, this.#eventsListComponent);

    this.#renderTrip();
  }

  #renderSort = () => {
    render(this.#tripComponent, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderEventPoint = (eventPoint) => {
    const eventPointPresenter = new EventPointPresenter(this.#eventsListComponent);
    eventPointPresenter.init(eventPoint);
  }

  #renderEventPoints = () => {
    this.#eventPoints.forEach((eventPoint) => {
      this.#renderEventPoint(eventPoint);
    });
  }

  #renderNoEventPoints = () => {
    render(this.#tripComponent, this.#noEventPointComponent);
  }

  #renderEventPointsList = () => {
    this.#renderEventPoints();
  }

  #renderTrip = () => {
    this.#renderSort();
    this.#renderEventPointsList();
  }
}
