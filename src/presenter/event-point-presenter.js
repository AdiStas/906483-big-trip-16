import {remove, render, replace} from '../utils/render';
import {KEYCODE} from '../const';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

export default class EventPointPresenter {
  #eventPointListContainer = null;
  #changeData = null;
  #changeMode = null;

  #eventPointComponent = null;
  #eventPointEditComponent = null;

  #eventPoint = null;
  #mode = Mode.DEFAULT;

  constructor(eventPointListContainer, changeData, changeMode) {
    this.#eventPointListContainer = eventPointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (eventPoint) => {
    this.#eventPoint = eventPoint;

    const prevEventPointComponent = this.#eventPointComponent;
    const prevEventPointEditComponent = this.#eventPointEditComponent;

    this.#eventPointComponent = new EventView(eventPoint);
    this.#eventPointEditComponent = new EventEditView(eventPoint);

    this.#eventPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#eventPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#eventPointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventPointEditComponent.setEditCloseClickHandler(this.#handleEditCloseClick);

    if (prevEventPointComponent === null || prevEventPointEditComponent === null) {
      render(this.#eventPointListContainer, this.#eventPointComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventPointEditComponent, prevEventPointEditComponent);
    }

    remove(prevEventPointComponent);
    remove(prevEventPointEditComponent);
  }

  destroy = () => {
    remove(this.#eventPointComponent);
    remove(this.#eventPointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEventPoint();
    }
  }

  #replaceEventPointToForm = () => {
    replace(this.#eventPointEditComponent, this.#eventPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEventPoint = () => {
    replace(this.#eventPointComponent, this.#eventPointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
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

  #handleFavoriteClick = () => {
    this.#changeData({...this.#eventPoint, isFavorite: !this.#eventPoint.isFavorite});
  }

  #handleEditCloseClick = () => {
    this.#replaceFormToEventPoint();
  }

  #handleFormSubmit = (eventPoint) => {
    this.#changeData(eventPoint);
    this.#replaceFormToEventPoint();
  }
}