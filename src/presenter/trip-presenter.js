import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import NoEventView from '../view/no-event-view';
import TripEventsView from '../view/trip-events-view';
import LoadingView from '../view/loading-view';
import EventPointPresenter, {State as EventPointPresenterViewState} from './event-point-presenter';
import EventPointNewPresenter from './event-point-new-presenter';
import {remove, render, RenderPosition} from '../utils/render';
import {filter} from '../utils/filter';
import {sortEventPointTime, sortEventPointPrice, sortEventPointDay} from '../utils/event-point';
import {SortType, UpdateType, UserAction, FilterType} from '../const';

export default class TripPresenter {
  #tripContainer = null;
  #eventPointsModel = null;
  #filterModel = null;

  #tripComponent = new TripEventsView();
  #eventsListComponent = new EventsListView();
  #loadingComponent = new LoadingView();
  #noEventComponent = null;
  #sortComponent = null;

  #eventPresenter = new Map();
  #eventPointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(tripContainer, eventPointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;

    this.#eventPointNewPresenter = new EventPointNewPresenter(this.#eventsListComponent, this.#handleViewAction);
  }

  get eventPoints() {
    this.#filterType = this.#filterModel.filter;
    const eventPoints = this.#eventPointsModel.eventPoints;
    const filteredEventPoints = filter[this.#filterType](eventPoints);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredEventPoints.sort(sortEventPointTime);
      case SortType.PRICE:
        return filteredEventPoints.sort(sortEventPointPrice);
    }
    return filteredEventPoints;
  }

  get destinations() {
    return this.#eventPointsModel.destinations;
  }

  get offers() {
    return this.#eventPointsModel.offers;
  }

  init = () => {
    this.#eventPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    render(this.#tripContainer, this.#tripComponent);

    this.#eventPointsModel.eventPoints.sort(sortEventPointDay);

    render(this.#tripContainer, this.#tripComponent);
    render(this.#tripComponent, this.#eventsListComponent);
    this.#renderTrip();
  }

  destroy = () => {
    this.#clearTrip(true);

    remove(this.#eventsListComponent);
    remove(this.#tripComponent);

    this.#eventPointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createEventPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#eventPointNewPresenter.init(this.destinations, this.offers);
  }

  #handleModeChange = () => {
    this.#eventPointNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT_POINT:
        this.#eventPresenter.get(update.id).setViewState(EventPointPresenterViewState.SAVING);
        try {
          await this.#eventPointsModel.updateEventPoint(updateType, update);
        } catch (err) {
          this.#eventPresenter.get(update.id).setViewState(EventPointPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_EVENT_POINT:
        this.#eventPointNewPresenter.setSaving();
        try {
          await this.#eventPointsModel.addEventPoint(updateType, update);
        } catch (err) {
          this.#eventPointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT_POINT:
        this.#eventPresenter.get(update.id).setViewState(EventPointPresenterViewState.DELETING);
        try {
          await this.#eventPointsModel.deleteEventPoint(updateType, update);
        } catch (err) {
          this.#eventPresenter.get(update.id).setViewState(EventPointPresenterViewState.ABORTING);
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#eventPointsModel.eventPoints.sort(sortEventPointDay);
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip(true);
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    eventPointPresenter.init(eventPoint, this.destinations, this.offers);
    this.#eventPresenter.set(eventPoint.id, eventPointPresenter);
  }

  #renderEventPoints = (eventPoints) => {
    eventPoints.forEach((eventPoint) => this.#renderEventPoint(eventPoint));
  }

  #renderLoading = () => {
    render(this.#tripComponent, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoEventPoints = () => {
    this.#noEventComponent = new NoEventView(this.#filterType);
    render(this.#tripComponent, this.#noEventComponent);
  }

  #clearTrip = (resetSortType = false) => {
    this.#eventPointNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

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
