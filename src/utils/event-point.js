import dayjs from 'dayjs';

export const sortEventPointDay = (a, b) => a.dateFrom.valueOf() - b.dateFrom.valueOf();
export const sortEventPointTime = (a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom));
export const sortEventPointPrice = (a, b) => b.price - a.price;

export const isPriceEqual = (priceA, priceB) => priceA === priceB;
export const isDateEqual = (updateDates, eventPointDates) => updateDates[0].valueOf() === eventPointDates[0].valueOf() && updateDates[1].valueOf() === eventPointDates[1].valueOf();
