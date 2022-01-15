import {EVENT_COUNT} from './const';
import {render} from './utils/render';
import {generateEventPoint} from './mock/event-point';
import SiteMenuView from './view/site-menu-view';
import FilterView from './view/filter-view';
import TripPresenter from './presenter/trip-presenter';
import EventPointsModel from '../model/points-model';

const eventPoints = Array.from({length: EVENT_COUNT}, generateEventPoint);

const eventPointsModel = new EventPointsModel();
eventPointsModel.eventPoints = eventPoints;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const siteNavElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElementContainer = siteMainElement.querySelector('.page-body__container');
const siteMainContentElement = siteMainElementContainer.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteMainElementContainer, siteMainContentElement, eventPointsModel);

render(siteNavElement, new SiteMenuView());
render(siteFilterElement, new FilterView());

tripPresenter.init();

