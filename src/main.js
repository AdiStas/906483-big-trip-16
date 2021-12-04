import {renderTemplate} from './render';
import {createSiteMenuTemplate} from './view/site-menu-view';
import {createFilterTemplate} from './view/filter-view';
import {createSortTemplate} from './view/sorting-view';
import {createEventsListTemplate} from './view/events-list-view';
import {createEventTemplate} from './view/event-view';
import {createEventEditTemplate} from './view/event-edit-view';

const EVENT_COUNT = 3;

const siteHeaderElement = document.querySelector('.page-header');
const siteNavElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');

renderTemplate(siteNavElement, createSiteMenuTemplate());
renderTemplate(siteFilterElement, createFilterTemplate());

const siteMainElement = document.querySelector('.page-main');
const pageMainContentElement = siteMainElement.querySelector('.trip-events');

renderTemplate(pageMainContentElement, createSortTemplate());
renderTemplate(pageMainContentElement, createEventsListTemplate());

const eventsListElement = pageMainContentElement.querySelector('.trip-events__list');

renderTemplate(eventsListElement, createEventEditTemplate());

for (let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(eventsListElement, createEventTemplate());
}
