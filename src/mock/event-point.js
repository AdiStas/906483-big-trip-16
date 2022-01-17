import dayjs from 'dayjs';
import {DESTINATIONS, OFFERS, TYPES} from '../const.js';
import {getRandomInteger} from '../utils/common';
import {nanoid} from 'nanoid';

let eventType = null;
const generateDestination = () => {
  const name = DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)].name;
  return {
    name: name,
    description: DESTINATIONS.find((item) => item.name === name).description,
    pictures: DESTINATIONS.find((item) => item.name === name).pictures,
  };
};
const generateDate = (type) => {
  const hoursGap = getRandomInteger(0, 24);
  const minutesGap = getRandomInteger(0, 59);
  if (type === 'start') {
    return dayjs().add(getRandomInteger(-2, -1), 'day').add(hoursGap, 'hour').add(minutesGap, 'minute');
  }
  if (type === 'end') {
    return dayjs().add(getRandomInteger(0, 2), 'day').add(hoursGap, 'hour').add(minutesGap, 'minute');
  }
};
const generateType = () => {
  eventType = TYPES[getRandomInteger(0, TYPES.length - 1)];
  return eventType;
};
const generateOffers = () => {
  const offersList = [];
  const offers = OFFERS.find((item) => item.type === eventType.title.toLowerCase()).offers;
  for (let i = 0; i < getRandomInteger(0, offers.length); i++) {
    offersList.push(offers[i]);
  }
  return offersList;
};
export const generatePicture = () => {
  const picturesList = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    picturesList.push({
      src: `https://picsum.photos/248/152?r${Math.random()}`,
      description: 'lorem ipsum',
    });
  }
  return picturesList;
};
export const generateEventPoint = () => ({
  id: nanoid(),
  price: getRandomInteger(1, 100),
  dateFrom: generateDate('start'),
  dateTo: generateDate('end'),
  destination: generateDestination(),
  isFavorite: Boolean(getRandomInteger(0, 1)),
  type: generateType(),
  offers: generateOffers(),
});
