import {render, replace} from '../utils/render';
import {KEYCODE} from '../const';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';

export default class EventPointPresenter {
  #eventPointListContainer = null;

  #eventPointComponent = null;
  #eventPointEditComponent = null;

  #eventPoint = null;

  constructor(eventPointListContainer) {
    this.#eventPointListContainer = eventPointListContainer;
  }

  init = (eventPoint) => {
    this.#eventPoint = eventPoint;

    this.#eventPointComponent = new EventView(eventPoint);
    this.#eventPointEditComponent = new EventEditView(eventPoint);

    this.#eventPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#eventPointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventPointEditComponent.setEditCloseClickHandler(this.#handleEditCloseClick);

    render(this.#eventPointListContainer, this.#eventPointComponent);
  }

  #replaceEventPointToForm = () => {
    replace(this.#eventPointEditComponent, this.#eventPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToEventPoint = () => {
    replace(this.#eventPointComponent, this.#eventPointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === KEYCODE.ESCAPE || evt.key === KEYCODE.ESC) {
      evt.preventDefault();
      this.#replaceFormToEventPoint();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventPointToForm();
  }

  #handleEditCloseClick = () => {
    this.#replaceFormToEventPoint();
  }

  #handleFormSubmit = () => {
    this.#replaceFormToEventPoint();
  }
}
