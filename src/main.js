import {EVENT_COUNT} from './const';
import {render} from './render';
import {generateEventPoint} from './mock/event-point';
import SiteMenuView from './view/site-menu-view';
import FilterView from './view/filter-view';
import SortingView from './view/sorting-view';
import EventsListView from './view/events-list-view';
import EventView from './view/event-view';
import EventEditView from './view/event-edit-view';

const eventPoint = Array.from({length: EVENT_COUNT}, generateEventPoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteNavElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(siteNavElement, new SiteMenuView().element);
render(siteFilterElement, new FilterView().element);

const siteMainElement = document.querySelector('.page-main');
const pageMainContentElement = siteMainElement.querySelector('.trip-events');
const eventsListComponent = new EventsListView();

render(pageMainContentElement, new SortingView().element);
render(pageMainContentElement, eventsListComponent.element);
render(eventsListComponent.element, new EventEditView(eventPoint[0]).element);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(eventsListComponent.element, new EventView(eventPoint[i]).element);
}
