import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view';

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
  sortedArrayOfObj.forEach((item)=> {
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

// const renderTypeCharts = (typeCtx, eventPoints) => new Chart(typeCtx, {
//   plugins: [ChartDataLabels],
//   type: 'horizontalBar',
//   data: {
//     labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'FLIGHT', 'DRIVE'],
//     datasets: [{
//       data: [4, 3, 2, 1, 1, 1],
//       backgroundColor: '#ffffff',
//       hoverBackgroundColor: '#ffffff',
//       anchor: 'start',
//       barThickness: 44,
//       minBarLength: 50,
//     }],
//   },
//   options: {
//     responsive: false,
//     plugins: {
//       datalabels: {
//         font: {
//           size: 13,
//         },
//         color: '#000000',
//         anchor: 'end',
//         align: 'start',
//         formatter: (val) => `${val}x`,
//       },
//     },
//     title: {
//       display: true,
//       text: 'TYPE',
//       fontColor: '#000000',
//       fontSize: 23,
//       position: 'left',
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           fontColor: '#000000',
//           padding: 5,
//           fontSize: 13,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//       }],
//       xAxes: [{
//         ticks: {
//           display: false,
//           beginAtZero: true,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//       }],
//     },
//     legend: {
//       display: false,
//     },
//     tooltips: {
//       enabled: false,
//     },
//   },
// });

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

    this._data = {
      eventPoints,
    };

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
    const {eventPoints} = this._data;
    // typeCtx.height = BAR_HEIGHT * 5;
    // timeCtx.height = BAR_HEIGHT * 5;
    // const typeCtx = document.querySelector('#type');
    // const timeCtx = document.querySelector('#time');
    const moneyCtx = this.element.querySelector('#money');
    this.#moneyCharts = renderMoneyCharts(moneyCtx, eventPoints);
    // this.#typeCharts = renderTypeCharts(typeCtx, eventPoints);
  }
}
