import EventEditView from '../view/event-edit-view';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition, replace} from '../utils/render.js';
import {UserAction, UpdateType, KeyCode, TYPES} from '../const.js';
import {getCurrentDate} from '../utils/common';

const BLANK_EVENT_POINT = {
  price: 0,
  dateFrom: getCurrentDate('YYYY/MM/DD HH:mm'),
  dateTo: getCurrentDate('YYYY/MM/DD HH:mm'),
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  offers: [],
  type: TYPES[0],
  isFavorite: false,
};

export default class EventPointNewPresenter {
  #eventPointListContainer = null;
  #changeData = null;
  #eventPointEditComponent = null;

  constructor(eventPointListContainer, changeData) {
    this.#eventPointListContainer = eventPointListContainer;
    this.#changeData = changeData;
  }

  init = (destinations, offers) => {
    if (this.#eventPointEditComponent !== null) {
      return;
    }

    this.#eventPointEditComponent = new EventEditView(BLANK_EVENT_POINT, destinations, offers);
    this.#eventPointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#eventPointEditComponent.setEditCloseClickHandler(this.#handleEditCloseClick);
    this.#eventPointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#eventPointListContainer, this.#eventPointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#eventPointEditComponent === null) {
      return;
    }

    remove(this.#eventPointEditComponent);
    this.#eventPointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditCloseClick = () => {
    this.destroy();
  }

  #handleFormSubmit = (eventPoint) => {
    this.#changeData(
      UserAction.ADD_EVENT_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...eventPoint},
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
