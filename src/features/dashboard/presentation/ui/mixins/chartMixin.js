import { Chart } from 'chart.js/auto'
import { context } from '@/core/common/presentation/models/Context.js'

/**
 * @typedef {object} chartConfig
 * @property {'bar' | 'pie' | 'doughnut'} [type]
 * @property {string} [selector]
 * @property {string[] || string[][]} [backgroundsColor]
 * @property {object} [dataset]
 * @property {string[]} [labels]
 * @property {any[]} [records]
 * @property {object} [options]
 * */

/** @type {chartConfig} */
const colors = context.inject('palette')
export const defaultBarChartConfig = {
  type: 'bar',
  backgroundsColor: [colors['c_vendor_1'], colors['c_vendor_2']],
  dataset: {
    labels: [],
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
    label: 0 < config.dataset.labels.length ? config.dataset.labels[index] : '',
    backgroundColor: config.backgroundsColor[index ?? 0],
    data,
  }))

  return new Chart(ctx, {
    type: config.type,

    data: { labels, datasets },
    options: config.options,
  })
}
