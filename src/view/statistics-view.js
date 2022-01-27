import SmartView from './smart-view';
import {renderChart} from '../utils/statistics';
import {ChartType} from '../const';

const createStatisticsItemTemplate = (id) => (
  `<div class="statistics__item">
      <canvas class="statistics__chart" id="${id}" width="900"></canvas>
    </div>`
);
const createStatisticsTemplate = () => {
  const statisticsItemTemplate = Object.values(ChartType)
    .map((item) => createStatisticsItemTemplate(item))
    .join('');
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    ${statisticsItemTemplate}
  </section>`;
};

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

  restoreHandlers = () => {
    this.#setCharts();
  }

  #setCharts = () => {
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    this.#moneyCharts = renderChart(moneyCtx, this._data, ChartType.MONEY);
    this.#typeCharts = renderChart(typeCtx, this._data, ChartType.TYPE);
    this.#timeCharts = renderChart(timeCtx, this._data, ChartType.TIME);
  }
}
