export function useUpdateChart(chart, { records, labels }) {
  if (!chart && (!records || !labels)) {
    throw new Error('Invalid chart')
  }
  chart.data.labels = labels
  chart.data.datasets = chart.data.datasets.map((dataset, index) => {
    return { ...dataset, data: records[index] }
  })
  chart.update()
}
