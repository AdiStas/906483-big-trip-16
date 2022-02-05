import TripTotalView from '../view/trip-total-view';
import {remove, render, RenderPosition} from '../utils/render';

export default class TripTotalPresenter {
  #eventPointsModel = null;
  #tripTotalView = null;
  #tripMainContainer = null;

  constructor(eventPointsModel, tripMainContainer) {
    this.#eventPointsModel = eventPointsModel;
    this.#tripMainContainer = tripMainContainer;
  }

  init = () => {
    if (this.#tripTotalView !== null) {
      remove(this.#tripTotalView);
    }

    if (this.#eventPointsModel.eventPoints.length === 0) {
      return;
    }

    this.#tripTotalView = new TripTotalView(this.#eventPointsModel.eventPoints);
    this.#renderTripTotal();
  }

  #renderTripTotal = () => {
    render(this.#tripMainContainer, this.#tripTotalView, RenderPosition.AFTERBEGIN);
  }
}

