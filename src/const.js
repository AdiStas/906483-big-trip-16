import {nanoid} from 'nanoid';
import {generatePicture} from './mock/event-point';

export const EVENT_COUNT = 15;
export const HOUR = 60;
export const DAY = 24;
export const TYPES = [
  {
    title: 'Taxi',
    checked: '',
  },
  {
    title: 'Bus',
    checked: '',
  },
  {
    title: 'Train',
    checked: '',
  },
  {
    title: 'Ship',
    checked: '',
  },
  {
    title: 'Drive',
    checked: '',
  },
  {
    title: 'Flight',
    checked: '',
  },
  {
    title: 'Check-in',
    checked: '',
  },
  {
    title: 'Sightseeing',
    checked: '',
  },
  {
    title: 'Restaurant',
    checked: '',
  },
];
export const DESTINATIONS = [
  {
    description: 'Chamonix, in a middle of Europe, middle-eastern paradise, famous for its crowded street markets with the best street food in Asia.',
    name: 'Chamonix',
    pictures: generatePicture(),
  },
  {
    description: 'Amsterdam, a true asian pearl, in a middle of Europe.',
    name: 'Amsterdam',
    pictures: generatePicture(),
  },
  {
    description: 'Den Haag, with an embankment of a mighty river as a centre of attraction.',
    name: 'Den Haag',
    pictures: generatePicture(),
  },
  {
    description: 'Berlin, is a beautiful city, with crowded streets, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.',
    name: 'Berlin',
    pictures: generatePicture(),
  },
  {
    description: 'Madrid, is a beautiful city, full of of cozy canteens where you can try the best coffee in the Middle East.',
    name: 'Madrid',
    pictures: generatePicture(),
  },
];
export const OFFERS = [
  {
    offers: [
      {id: nanoid(), title: 'Upgrade to a business class', price: 190},
      {id: nanoid(), title: 'Choose the radio station', price: 30},
      {id: nanoid(), title: 'Choose temperature', price: 170},
      {id: nanoid(), title: 'Drive quickly, I\'m in a hurry', price: 100},
      {id: nanoid(), title: 'Drive slowly', price: 110},
    ],
    type: 'taxi',
  },
  {
    offers: [
      {id: nanoid(), title: 'Infotainment system', price: 50},
      {id: nanoid(), title: 'Order meal', price: 100},
      {id: nanoid(), title: 'Choose seats', price: 190},
    ],
    type: 'bus',
  },
  {
    offers: [
      {id: nanoid(), title: 'Book a taxi at the arrival point', price: 110},
      {id: nanoid(), title: 'Order a breakfast', price: 80},
      {id: nanoid(), title: 'Wake up at a certain time', price: 140},
    ],
    type: 'train',
  },
  {
    offers: [
      {id: nanoid(), title: 'Choose meal', price: 120},
      {id: nanoid(), title: 'Choose seats', price: 90},
      {id: nanoid(), title: 'Upgrade to comfort class', price: 120},
      {id: nanoid(), title: 'Upgrade to business class', price: 120},
      {id: nanoid(), title: 'Add luggage', price: 170},
      {id: nanoid(), title: 'Business lounge', price: 160},
    ],
    type: 'flight',
  },
  {
    offers: [
      {id: nanoid(), title: 'Choose the time of check-in', price: 70},
      {id: nanoid(), title: 'Choose the time of check-out', price: 190},
      {id: nanoid(), title: 'Add breakfast', price: 110},
      {id: nanoid(), title: 'Laundry', price: 140},
      {id: nanoid(), title: 'Order a meal from the restaurant', price: 30},
    ],
    type: 'check-in',
  },
  {
    offers: [],
    type: 'sightseeing',
  },
  {
    offers: [
      {id: nanoid(), title: 'Choose meal', price: 130},
      {id: nanoid(), title: 'Choose seats', price: 160},
      {id: nanoid(), title: 'Upgrade to comfort class', price: 170},
      {id: nanoid(), title: 'Upgrade to business class', price: 150},
      {id: nanoid(), title: 'Add luggage', price: 100},
      {id: nanoid(), title: 'Business lounge', price: 40}
    ],
    type: 'ship',
  },
  {
    offers: [
      {id: nanoid(), title: 'With automatic transmission', price: 110},
      {id: nanoid(), title: 'With air conditioning', price: 180},
    ],
    type: 'drive',
  },
  {
    offers: [
      {id: nanoid(), title: 'Choose live music', price: 150},
      {id: nanoid(), title: 'Choose VIP area', price: 70},
    ],
    type: 'restaurant',
  },
];
export const KEYCODE = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_EVENT_POINT: 'UPDATE_EVENT_POINT',
  ADD_EVENT_POINT: 'ADD_EVENT_POINT',
  DELETE_EVENT_POINT: 'DELETE_EVENT_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  TABLE: 'table',
  STATS: 'stats',
};
