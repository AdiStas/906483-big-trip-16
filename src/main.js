import {EVENT_COUNT, KEYCODE} from './const';
import {render, replace} from './utils/render';
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
const siteMainElement = document.querySelector('.page-main');
const siteMainContentElement = siteMainElement.querySelector('.trip-events');
const eventsListComponent = new EventsListView();

const renderEventPoint = (eventsListElement, eventPoint) => {
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
  render(eventsListElement, eventPointComponent);
};

render(siteNavElement, new SiteMenuView());
render(siteFilterElement, new FilterView());
render(siteMainContentElement, new SortingView());
render(siteMainContentElement, eventsListComponent);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderEventPoint(eventsListComponent, eventPoints[i]);
}
