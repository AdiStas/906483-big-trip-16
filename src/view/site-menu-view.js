import AbstractView from './abstract-view';
import {MenuItem} from '../const';

const createSiteMenuTemplate = (currentMenuItem) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
     <a class="trip-tabs__btn ${currentMenuItem === MenuItem.TABLE ? 'trip-tabs__btn--active' : ''}" href="#" data-menu-item="${MenuItem.TABLE}">Table</a>
     <a class="trip-tabs__btn ${currentMenuItem === MenuItem.STATS ? 'trip-tabs__btn--active' : ''}" href="#" data-menu-item="${MenuItem.STATS}">Stats</a>
  </nav>`
);

export default class SiteMenuView extends AbstractView {
  #currentMenuItem = null;

  constructor(currentMenuItem) {
    super();
    this.#currentMenuItem = currentMenuItem;
  }

  get template() {
    return createSiteMenuTemplate(this.#currentMenuItem);
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#currentMenuItem = evt.target.dataset.menuItem;
    this._callback.menuClick(evt.target.dataset.menuItem);
  }
}
