import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {sortItemByDateFrom, sortItemByDateTo} from './common';
import {ChartType} from '../const';

dayjs.extend(duration);

const getUniqTitles = (eventPoints) => {
  let titles = new Set;
  eventPoints.forEach((item) => {
    titles.add(item.type.title);
  });
  titles = [...titles];
  return titles;
};

const getArraysFilteredByType = (titles, eventPoints) => {
  const arraysFilteredByType = [];
  titles.forEach((item) => {
    arraysFilteredByType.push(eventPoints.filter((i) => i.type.title === item));
  });
  return arraysFilteredByType;
};

const getSortedData = (titles, values) => {
  const arrayOfObj = titles.map((item, index) => ({
    label: item,
    data: values[index] || 0
  }));
  const sortedArrayOfObj = arrayOfObj.sort((a, b) => b.data - a.data);
  const labels = [];
  const data = [];
  sortedArrayOfObj.forEach((item) => {
    labels.push(item.label);
    data.push(item.data);
  });
  return {labels, data};
};

const valueFormat = (val, type) => {
  if (type === ChartType.MONEY) {
    return `€ ${val}`;
  }
  if (type === ChartType.TYPE) {
    return `${val}x`;
  }
  if (type === ChartType.TIME) {
    let value = dayjs.duration(val).format('DD[D] HH[H] mm[M]');
    value = value.split(' ');
    if (value[0] === '00D') {
      value.shift();
      if (value[0] === '00H') {
        value.shift();
      }
    }
    return `${value.join(' ')}`;
  }
};

export const renderChart = (ctx, eventPoints, type) => {
  const titles = getUniqTitles(eventPoints);
  const titlesToUpperCase = titles.map((item) => item.toUpperCase());
  const arraysFilteredByType = getArraysFilteredByType(titles, eventPoints);

  let values = [];

  if (type === ChartType.MONEY) {
    arraysFilteredByType.forEach((item) => {
      values.push(item.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0));
    });
  }

  if (type === ChartType.TYPE) {
    values = arraysFilteredByType.map((item) => item.length);
  }

  if (type === ChartType.TIME) {
    // todo доработать сортировку
    const minDates = arraysFilteredByType.map((item) => {
      item.sort(sortItemByDateFrom);
      return item[0].dateFrom.valueOf();
    });
    const maxDates = arraysFilteredByType.map((item) => {
      item.sort(sortItemByDateTo);
      return item[0].dateTo.valueOf();
    });
    minDates.forEach((item, index) => {
      values.push(maxDates[index] - item);
    });
  }

  const {
    labels,
    data,
  } = getSortedData(titlesToUpperCase, values);

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => valueFormat(val, type),
        },
      },
      title: {
        display: true,
        text: type.toUpperCase(),
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
