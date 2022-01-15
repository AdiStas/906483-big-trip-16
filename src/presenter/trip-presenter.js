import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import NoEventView from '../view/no-event-view';

import {remove, render, RenderPosition} from '../utils/render';
import EventPointPresenter from './event-point-presenter';
import {SortType, UpdateType, UserAction} from '../const';
import {sortEventPointTime, sortEventPointPrice, sortEventPointDay} from '../utils/event-point';

export default class TripPresenter {
  #tripContainer = null;
  #eventPointsModel = null;

  #tripComponent = null;
  #eventsListComponent = new EventsListView();
  #noEventComponent = new NoEventView();
  #sortComponent = null;

  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(tripContainer, tripComponent, eventPointsModel) {
    this.#tripContainer = tripContainer;
    this.#tripComponent = tripComponent;
    this.#eventPointsModel = eventPointsModel;

    this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  get eventPoints() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#eventPointsModel.eventPoints].sort(sortEventPointTime);
      case SortType.PRICE:
        return [...this.#eventPointsModel.eventPoints].sort(sortEventPointPrice);
    }
    return this.#eventPointsModel.eventPoints;
  }

  init = () => {
    if (this.#eventPointsModel.eventPoints.length > 0) {
      this.#eventPointsModel.eventPoints.sort(sortEventPointDay);

      render(this.#tripComponent, this.#eventsListComponent);
      this.#renderTrip();

      return;
    }

    this.#renderNoEventPoints();
  }

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT_POINT:
        this.#eventPointsModel.updateEventPoint(updateType, update);
        break;
      case UserAction.ADD_EVENT_POINT:
        this.#eventPointsModel.addEventPoint(updateType, update);
        break;
      case UserAction.DELETE_EVENT_POINT:
        this.#eventPointsModel.deleteEventPoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip(true);
        this.#renderTrip();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  }

  #renderSort = () => {
    this.#sortComponent = new SortingView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#tripComponent, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderEventPoint = (eventPoint) => {
    const eventPointPresenter = new EventPointPresenter(this.#eventsListComponent, this.#handleViewAction, this.#handleModeChange);
    eventPointPresenter.init(eventPoint);
    this.#eventPresenter.set(eventPoint.id, eventPointPresenter);
  }

  #renderEventPoints = (eventPoints) => {
    eventPoints.forEach((eventPoint) => this.#renderEventPoint(eventPoint));
  }

  #renderNoEventPoints = () => {
    render(this.#tripComponent, this.#noEventComponent);
  }

  #clearTrip = (resetSortType = false) => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noEventComponent);

    if(resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip = () => {
    const eventPoints = this.eventPoints;
    const eventPointCount = eventPoints.length;

    if (eventPointCount === 0) {
      this.#renderNoEventPoints();
      return;
    }

    this.#renderSort();
    this.#renderEventPoints(eventPoints);
  }
}
