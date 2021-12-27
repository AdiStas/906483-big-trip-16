import dayjs from 'dayjs';
import {DESCRIPTIONS, DESTINATIONS, OFFERS, TYPES,} from '../const.js';
import {getRandomInteger} from '../utils/common';

const generateDescription = () => {
  const descriptionsList = [];
  for (let i = 0; i < getRandomInteger(1, DESCRIPTIONS.length); i++) {
    descriptionsList.push(DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length)]);
  }
  return descriptionsList.join(' ');
};
const generateOffers = () => {
  const offersList = [];
  for (let i = 0; i < getRandomInteger(0, OFFERS.length); i++) {
    offersList.push(OFFERS[i]);
  }
  return offersList;
};
const generatePicture = () => {
  const picturesList = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    picturesList.push({
      src: `https://picsum.photos/248/152?r${Math.random()}`,
      description: 'lorem ipsum',
    });
  }
  return picturesList;
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
export const generateEventPoint = () => ({
  price: getRandomInteger(1, 100),
  dateFrom: generateDate('start'),
  dateTo: generateDate('end'),
  destination: {
    description: generateDescription(),
    name: DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
    pictures: generatePicture(),
  },
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: generateOffers(),
  type: TYPES[getRandomInteger(0, TYPES.length - 1)],
});
