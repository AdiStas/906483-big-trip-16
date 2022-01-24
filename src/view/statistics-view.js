import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view';
import {calculateDatesDiff} from '../utils/common';

const renderMoneyCharts = (ctx, eventPoints) => {
  let titles = new Set;
  eventPoints.forEach((item) => {
    titles.add(item.type.title);
  });
  titles = [...titles];
  const labels = titles.map((item) => item.toUpperCase());

  const arraysFilteredByType = [];
  titles.forEach((item) => {
    arraysFilteredByType.push(eventPoints.filter((i) => i.type.title === item));
  });

  const data = [];
  arraysFilteredByType.forEach((item) => {
    data.push(item.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0));
  });
  const arrayOfObj = labels.map((item, index) => ({
    label: item,
    data: data[index] || 0
  }));
  const sortedArrayOfObj = arrayOfObj.sort((a, b) => b.data - a.data);
  const newArrayLabel = [];
  const newArrayData = [];
  sortedArrayOfObj.forEach((item) => {
    newArrayLabel.push(item.label);
    newArrayData.push(item.data);
  });

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: newArrayLabel,
      datasets: [{
        data: newArrayData,
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
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
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

const renderTypeCharts = (typeCtx, eventPoints) => {
  let titles = new Set;
  eventPoints.forEach((item) => {
    titles.add(item.type.title);
  });
  titles = [...titles];
  const labels = titles.map((item) => item.toUpperCase());

  const arraysFilteredByType = [];
  titles.forEach((item) => {
    arraysFilteredByType.push(eventPoints.filter((i) => i.type.title === item));
  });

  const data = arraysFilteredByType.map((item) => item.length);

  const arrayOfObj = labels.map((item, index) => ({
    label: item,
    data: data[index] || 0
  }));
  const sortedArrayOfObj = arrayOfObj.sort((a, b) => b.data - a.data);
  const newArrayLabel = [];
  const newArrayData = [];
  sortedArrayOfObj.forEach((item) => {
    newArrayLabel.push(item.label);
    newArrayData.push(item.data);
  });

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: newArrayLabel,
      datasets: [{
        data: newArrayData,
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
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
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

const renderTimeCharts = (timeCtx, eventPoints) => {
  let titles = new Set;
  eventPoints.forEach((item) => {
    titles.add(item.type.title);
  });
  titles = [...titles];
  const labels = titles.map((item) => item.toUpperCase());

  const arraysFilteredByType = [];
  titles.forEach((item) => {
    arraysFilteredByType.push(eventPoints.filter((i) => i.type.title === item));
  });

  const sortItemByDateFrom = (a, b) => a.dateFrom.valueOf() - b.dateFrom.valueOf();
  const sortItemByDateTo = (a, b) => b.dateFrom.valueOf() - a.dateFrom.valueOf();

  const minDates = arraysFilteredByType.map((item) => {
    item.sort(sortItemByDateFrom);
    return item[0].dateFrom.valueOf();
  });
  const maxDates = arraysFilteredByType.map((item) => {
    item.sort(sortItemByDateTo);
    return item[0].dateFrom.valueOf();
  });
  const data = [];
  minDates.forEach((item, index) => {
    data.push(minDates - maxDates[index]);
  });

  const arrayOfObj = labels.map((item, index) => ({
    label: item,
    data: data[index] || 0
  }));
  const sortedArrayOfObj = arrayOfObj.sort((a, b) => b.data - a.data);
  const newArrayLabel = [];
  const newArrayData = [];
  sortedArrayOfObj.forEach((item) => {
    newArrayLabel.push(item.label);
    newArrayData.push(item.data);
  });
  console.log(newArrayData);
  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: newArrayLabel,
      datasets: [{
        data: newArrayData,
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
          formatter: (val) => `${val}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
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

const createStatisticsTemplate = () => `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
  </section>`;

export default class StatisticsView extends SmartView {
  #moneyCharts = null;
  #typeCharts = null;
  #timeCharts = null;

  constructor(eventPoints) {
    super();

    this._data = eventPoints;

    this.#setCharts();
  }

  get template() {
    return createStatisticsTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyCharts) {
      this.#moneyCharts.destroy();
      this.#moneyCharts = null;
    }

    if (this.#typeCharts) {
      this.#typeCharts.destroy();
      this.#typeCharts = null;
    }

    if (this.#timeCharts) {
      this.#timeCharts.destroy();
      this.#timeCharts = null;
    }
  }

  #setCharts = () => {
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    this.#moneyCharts = renderMoneyCharts(moneyCtx, this._data);
    this.#typeCharts = renderTypeCharts(typeCtx, this._data);
    this.#timeCharts = renderTimeCharts(timeCtx, this._data);
  }
}
