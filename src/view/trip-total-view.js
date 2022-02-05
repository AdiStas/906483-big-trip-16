import AbstractView from './abstract-view';
import {sortEventPointDay} from '../utils/event-point';
import {getDateByFormat} from '../utils/common';

const MultiSeparator = '—...—';
const SingleSeparator = '—';
const CitiesCount = 3;

const getTripTotalCities = (eventPoints) => {
  const cities = eventPoints.map((item) => item.destination.name);
  const tripStartCity = cities[0];
  const tripIntermediateCity = cities[1];
  const tripFinishCity = cities[cities.length - 1];

  switch (true) {
    case cities.length > CitiesCount:
      return `${tripStartCity} ${MultiSeparator} ${tripFinishCity}`;
    case cities.length === CitiesCount:
      return `${tripStartCity} ${SingleSeparator} ${tripIntermediateCity} ${SingleSeparator} ${tripFinishCity}`;
    case cities.length < CitiesCount:
      return `${tripStartCity} ${SingleSeparator} ${tripFinishCity}`;
  }
};

const getTripTotalDates = (eventPoints) => {
  const dates = [eventPoints[0].dateFrom, eventPoints[eventPoints.length - 1].dateTo];
  return `${getDateByFormat(dates[0], 'DD MMM')}
          ${SingleSeparator}
          ${getDateByFormat(dates[1], 'DD MMM')}`;
};

const getTotalSum = (eventPoints) => {
  const eventPointsPriseSum = eventPoints.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
  const eventPointsOffersSum = eventPoints.map((item) => item.offers.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0));

  return eventPointsOffersSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0) + eventPointsPriseSum;
};

const createTripTotalTemplate = (eventPoints) => {
  const sortedEventPoints = eventPoints.sort(sortEventPointDay);

  const cities = getTripTotalCities(sortedEventPoints);
  const duration = getTripTotalDates(sortedEventPoints);
  const totalSum = getTotalSum(sortedEventPoints);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${cities}</h1>
              <p class="trip-info__dates">${duration}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
            </p>
          </section>`;
};

export default class TripTotalView extends AbstractView{
  #eventPoints = null;

  constructor(eventPoints) {
    super();
    this.#eventPoints = eventPoints;
  }

  get template() {
    return createTripTotalTemplate(this.#eventPoints);
  }
}
