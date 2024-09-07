import {useMoney} from "../../../../../core/common/presentation/hooks/useMoney.js";
import {Chart} from "chart.js/auto";

const config = {
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => useMoney({ value, currency: 'USD' }),
        },
      },
    },
  },
}

export default function (labels, records) {
  const ctx = document.querySelector('#trips')
  const datasets = records.map((data, index) => ({ ...config.dataset, backgroundColor: config.backgroundsColor[index ?? 0], data }))

  return new Chart(ctx, {
    type: config.type,
    data: { labels, datasets },
    options: config.options,
  })
}
