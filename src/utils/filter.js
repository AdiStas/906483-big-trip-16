import {FilterType} from '../const';
import {getCurrentDate, getDateByFormat} from '../utils';

export const filter = {
  [FilterType.EVERYTHING]: (eventPoints) => eventPoints.filter((eventPoint) => eventPoint),
  [FilterType.FUTURE]: (eventPoints) => eventPoints.filter((eventPoint) => getDateByFormat(eventPoint.dateFrom, 'YYYY-MM-DD') >= getCurrentDate('YYYY-MM-DD')),
  [FilterType.PAST]: (eventPoints) => eventPoints.filter((eventPoint) => getDateByFormat(eventPoint.dateTo, 'YYYY-MM-DD') < getCurrentDate('YYYY-MM-DD')),
};
