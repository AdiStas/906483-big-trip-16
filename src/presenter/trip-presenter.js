import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import NoEventView from '../view/no-event-view';

import {render, RenderPosition} from '../utils/render';
import EventPointPresenter from './event-point-presenter';
import {updateItem} from '../utils/common';
import {SORT_TYPE} from '../const';
import {sortEventPointTime, sortEventPointPrice, sortEventPointDay} from '../utils/event-point';

export default class TripPresenter {
  #tripContainer = null;

  #tripComponent = null;
  #sortComponent = new SortingView();
  #eventsListComponent = new EventsListView();
  #noEventComponent = new NoEventView()

  #eventPoints = [];
  #eventPresenter = new Map();
  #currentSortType = SORT_TYPE.DAY;
  #sourcedEventPoints = [];

  constructor(tripContainer, tripComponent) {
    this.#tripContainer = tripContainer;
    this.#tripComponent = tripComponent;
  }

  init = (eventPoints) => {
    if (eventPoints.length > 0) {
      eventPoints.sort(sortEventPointDay);
      this.#eventPoints = [...eventPoints];
      this.#sourcedEventPoints = [...eventPoints];

      render(this.#tripComponent, this.#eventsListComponent);

      this.#renderTrip();

      return;
    }
    this.#renderNoEventPoints();
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleEventPointChange = (updatedEventPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedEventPoint);
    this.#sourcedEventPoints = updateItem(this.#sourcedEventPoints, updatedEventPoint);
    this.#eventPresenter.get(updatedEventPoint.id).init(updatedEventPoint);
  }

  #sortEventPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.TIME:
        this.#eventPoints.sort(sortEventPointTime);
        break;
      case SORT_TYPE.PRICE:
        this.#eventPoints.sort(sortEventPointPrice);
        break;
      default:
        this.#eventPoints = [...this.#sourcedEventPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortEventPoints(sortType);
    this.#clearEventPointsList();
    this.#renderEventPointsList();
  }

  #renderSort = () => {
    render(this.#tripComponent, this.#sortComponent, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderEventPoint = (eventPoint) => {
    const eventPointPresenter = new EventPointPresenter(this.#eventsListComponent, this.#handleEventPointChange, this.#handleModeChange);
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
