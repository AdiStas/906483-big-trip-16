import dayjs from 'dayjs';
import {DAY, HOUR} from './const';

export const getCurrentDate = (format) => dayjs().format(format);
export const getDateByFormat = (date, format = 'DD.MM.YYYY') => dayjs(date).format(format);
export const calculateDatesDiff = (dateFrom, dateTo) => {
  const formatTime = (time) => (String(time).length === 1) ? `0${time}` : time;
  const daysDiff = dayjs(dateTo).diff(dateFrom, 'd');
  const hoursDiff = dayjs(dateTo).diff(dateFrom, 'h') - daysDiff * DAY;
  const minutesDiff = dayjs(dateTo).diff(dateFrom, 'm') - daysDiff * DAY * HOUR - hoursDiff * HOUR;

  if (daysDiff === 0 && hoursDiff === 0) {
    return `${formatTime(minutesDiff)}M`;
  }
  if (daysDiff === 0) {
    return `${formatTime(hoursDiff)}H ${formatTime(minutesDiff)}M`;
  }
  return `${formatTime(daysDiff)}D ${formatTime(hoursDiff)}H ${formatTime(minutesDiff)}M`;
};
