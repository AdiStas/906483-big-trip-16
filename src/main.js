import {renderTemplate, RenderPosition} from './render';
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

renderTemplate(siteNavElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFilterElement, createFilterTemplate(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.page-main');
const pageMainContentElement = siteMainElement.querySelector('.trip-events');

renderTemplate(pageMainContentElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(pageMainContentElement, createEventsListTemplate(), RenderPosition.BEFOREEND);

const eventsListElement = pageMainContentElement.querySelector('.trip-events__list');

renderTemplate(eventsListElement, createEventEditTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(eventsListElement, createEventTemplate(), RenderPosition.BEFOREEND);
}
