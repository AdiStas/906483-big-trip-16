import {AUTHORIZATION, END_POINT, MenuItem} from './const';
import {remove, render} from './utils/render';
import SiteMenuView from './view/site-menu-view';
import StatisticsView from './view/statistics-view';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import EventPointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import ApiService from './api-service';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const eventPointsModel = new EventPointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const currentMenuItem = MenuItem.TABLE;
const siteMenuComponent = new SiteMenuView(currentMenuItem);

const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteNavElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElementContainer = siteMainElement.querySelector('.page-body__container');

const tripPresenter = new TripPresenter(siteMainElementContainer, eventPointsModel, filterModel, tripMainElement);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventPointsModel);

let statisticsComponent = null;

const addBtn = document.querySelector('.trip-main__event-add-btn');
addBtn.disabled = true;

const handleEventPointCreate = () => {
  filterPresenter.destroy();
  filterPresenter.init();
  tripPresenter.destroy();
  tripPresenter.init();
  tripPresenter.createEventPoint();
  addBtn.disabled = true;
};

const setAddBtnActiveState = () => {
  addBtn.disabled = false;
  addBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    handleEventPointCreate();
  });
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(siteMenuComponent);
      render(siteNavElement, siteMenuComponent);
      siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
      filterPresenter.init();
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      remove(siteMenuComponent);
      render(siteNavElement, siteMenuComponent);
      siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
      filterPresenter.destroy();
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(eventPointsModel.eventPoints);
      render(siteMainElementContainer, statisticsComponent);
      break;
  }
};

render(siteNavElement, siteMenuComponent);

filterPresenter.init();
tripPresenter.init();

eventPointsModel.init().finally(() => {
  setAddBtnActiveState();
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});
