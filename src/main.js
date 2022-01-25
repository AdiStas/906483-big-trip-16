import {EVENT_COUNT} from './const';
import {remove, render} from './utils/render';
import {generateEventPoint} from './mock/event-point';
import SiteMenuView from './view/site-menu-view';
import StatisticsView from './view/statistics-view';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import EventPointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import {MenuItem} from './const';

const eventPoints = Array.from({length: EVENT_COUNT}, generateEventPoint);

const eventPointsModel = new EventPointsModel();
eventPointsModel.eventPoints = eventPoints;

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const currentMenuItem = MenuItem.TABLE;
const siteMenuComponent = new SiteMenuView(currentMenuItem);

const siteNavElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElementContainer = siteMainElement.querySelector('.page-body__container');

const tripPresenter = new TripPresenter(siteMainElementContainer, eventPointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventPointsModel);

render(siteNavElement, siteMenuComponent);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createEventPoint();
});

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      filterPresenter.init();
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      filterPresenter.destroy();
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(eventPointsModel.eventPoints);
      render(siteMainElementContainer, statisticsComponent);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();
