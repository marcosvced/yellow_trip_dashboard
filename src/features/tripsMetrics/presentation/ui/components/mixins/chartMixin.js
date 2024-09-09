import { Chart } from 'chart.js/auto'

/**
 * @typedef {object} chartConfig
 * @property {'bar' | 'pie'} [type]
 * @property {string} [selector]
 * @property {string[] || string[][]} [backgroundsColor]
 * @property {object} [dataset]
 * @property {string[]} [labels]
 * @property {any[]} [records]
 * @property {object} [options]
 * */

/** @type {chartConfig} */
export const defaultBarChartConfig = {
  type: 'bar',
  backgroundsColor: ['#93A0FF', '#5AD2E4'],
  dataset: {
    borderRadius: 8,
    maxBarThickness: 24,
    minBarThickness: 8,
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
}

/** @param {chartConfig} chartConfig */
export default function (chartConfig = {}) {
  /** @type {chartConfig} */
  const config = {
    ...defaultBarChartConfig,
    ...chartConfig,
  }
  const ctx = document.querySelector(config.selector)

  const { records, labels } = config
  const datasets = records.map((data, index) => ({
    ...config.dataset,
    backgroundColor: config.backgroundsColor[index ?? 0],
    data,
  }))

  return new Chart(ctx, {
    type: config.type,

    data: { labels, datasets },
    options: config.options,
  })
}
