import {EVENT_COUNT} from './const';
import {renderTemplate} from './render';
import {createSiteMenuTemplate} from './view/site-menu-view';
import {createFilterTemplate} from './view/filter-view';
import {createSortTemplate} from './view/sorting-view';
import {createEventsListTemplate} from './view/events-list-view';
import {createEventTemplate} from './view/event-view';
import {createEventEditTemplate} from './view/event-edit-view';
import {generateEventPoint} from './mock/event-point';

const eventPoint = Array.from({length: EVENT_COUNT}, generateEventPoint);

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

renderTemplate(eventsListElement, createEventEditTemplate(eventPoint[0]));

for (let i = 1; i < EVENT_COUNT; i++) {
  renderTemplate(eventsListElement, createEventTemplate(eventPoint[i]));
}
