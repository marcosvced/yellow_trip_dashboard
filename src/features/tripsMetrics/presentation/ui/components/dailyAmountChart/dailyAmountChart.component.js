import { Component } from '@/core/common/presentation/models/Component.js'
import template from './index.template.html?raw'
import { useOnMounted } from '@/core/common/presentation/hooks/useOnMounted.js'
import { context } from '@/core/common/presentation/models/Context.js'
import useGetSummaryByVendor from '@/features/tripsMetrics/presentation/ui/hooks/useGetSummaryByVendor.js'
import chartMixin, {
  defaultBarChartConfig,
} from '@/features/tripsMetrics/presentation/ui/components/mixins/chartMixin.js'
import { useUpdateChart } from '@/core/common/presentation/hooks/useUpdateChart.js'
export class DailyAmountChart extends Component {
  constructor() {
    super()
  }

  setup() {
    let chart = undefined
    useOnMounted(() => {
      const bloc = context.inject('TripsMetricsBloc')
      bloc.subscribe(() => {
        const { labels, records } = this._getData(bloc.state.value.data.summary)
        console.log(labels, records)
        if (!chart) {
          chart = chartMixin({
            labels,
            records: [records],
            backgroundsColor: [defaultBarChartConfig.backgroundsColor],
            selector: '#daily-amount-chart',
            type: 'doughnut',
            dataset: {
              ...defaultBarChartConfig.dataset,
              borderWidth: 16,
              borderRadius: 20,
              borderColor: '#27292C',
            },
          })
          return
        }
        useUpdateChart(chart, { records: [records], labels })
      })
    })
  }

  template() {
    return template
  }

  _getData(summary) {
    const summaryByVendor = useGetSummaryByVendor(summary)
    const paxByVendor = summaryByVendor.map((innerArray) => {
      const total = innerArray.reduce((acc, curr) => acc + curr.amount.value, 0)
      return { vendor: innerArray[0].vendor, amount: total }
    })
    return {
      labels: paxByVendor.map((data => data.vendor)),
      records: paxByVendor.map(data => data.amount),
    }
  }
}

customElements.define('ui-daily-amount-chart', DailyAmountChart)
