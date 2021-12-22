import {EVENT_COUNT, KEYCODE} from './const';
import {render} from './render';
import {generateEventPoint} from './mock/event-point';
import SiteMenuView from './view/site-menu-view';
import FilterView from './view/filter-view';
import SortingView from './view/sorting-view';
import EventsListView from './view/events-list-view';
import EventView from './view/event-view';
import EventEditView from './view/event-edit-view';

const eventPoints = Array.from({length: EVENT_COUNT}, generateEventPoint);

const siteHeaderElement = document.querySelector('.page-header');
const siteNavElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

const renderEventPoint = (eventListElement, eventPoint) => {
  const eventPointComponent = new EventView(eventPoint);
  const eventPointEditComponent = new EventEditView(eventPoint);

  const replaceEventPointToForm = () => {
    eventListElement.replaceChild(eventPointEditComponent.element, eventPointComponent.element);
  };
  const replaceFormToEventPoint = () => {
    eventListElement.replaceChild(eventPointComponent.element, eventPointEditComponent.element);
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === KEYCODE.ESCAPE || evt.key === KEYCODE.ESC) {
      evt.preventDefault();
      replaceFormToEventPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  eventPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventPointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });
  eventPointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEventPoint();
  });
  render(eventListElement, eventPointComponent.element);
};

render(siteNavElement, new SiteMenuView().element);
render(siteFilterElement, new FilterView().element);

const siteMainElement = document.querySelector('.page-main');
const pageMainContentElement = siteMainElement.querySelector('.trip-events');
const eventsListComponent = new EventsListView();

render(pageMainContentElement, new SortingView().element);
render(pageMainContentElement, eventsListComponent.element);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderEventPoint(eventsListComponent.element, eventPoints[i]);
}
