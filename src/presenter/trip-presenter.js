import {render, replace} from '../utils/render';
import {KEYCODE} from '../const';
import EventsListView from '../view/events-list-view';
import SortingView from '../view/sorting-view';
import NoEventPointView from '../view/no-event-point-view';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';

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

    render(this.#tripContainer, this.#tripComponent);
    render(this.#tripComponent, this.#eventsListComponent);

    this.#renderTrip();
  }

  #renderSort = () => {
    render(this.#tripComponent, this.#sortComponent);
  }

  #renderEventPoint = (eventPoint) => {
    const eventPointComponent = new EventView(eventPoint);
    const eventPointEditComponent = new EventEditView(eventPoint);

    const replaceEventPointToForm = () => {
      replace(eventPointEditComponent, eventPointComponent);
    };
    const replaceFormToEventPoint = () => {
      replace(eventPointComponent, eventPointEditComponent);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === KEYCODE.ESCAPE || evt.key === KEYCODE.ESC) {
        evt.preventDefault();
        replaceFormToEventPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    eventPointComponent.setEditClickHandler(() => {
      replaceEventPointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });
    eventPointEditComponent.setEditCloseClickHandler(() => {
      replaceFormToEventPoint();
    });
    eventPointEditComponent.setFormSubmitHandler(() => {
      replaceFormToEventPoint();
    });
    render(this.#eventsListComponent, eventPointComponent);
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
