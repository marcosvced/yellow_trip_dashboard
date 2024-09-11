import { Component } from '@/core/common/presentation/models/Component.js'
import template from './index.template.html?raw'
import { useOnMounted } from '@/core/common/presentation/hooks/useOnMounted.js'
import { context } from '@/core/common/presentation/models/Context.js'
import useGetSummaryByVendor from '@/features/dashboard/presentation/ui/hooks/useGetSummaryByVendor.js'
import chartMixin, {
  defaultBarChartConfig,
} from '@/features/dashboard/presentation/ui/mixins/chartMixin.js'
import { useUpdateChart } from '@/core/common/presentation/hooks/useUpdateChart.js'

export class DailyPaxChart extends Component {
  constructor() {
    super()
  }

  setup() {
    let chart = undefined
    const colors = context.inject('palette')
    useOnMounted(() => {
      const bloc = context.inject('DashboardBloc')
      bloc.subscribe(() => {
        const { labels, records } = this._getData(bloc.state.value.data.summary)
        if (!chart) {
          chart = chartMixin({
            labels,
            records: [records],
            backgroundsColor: [defaultBarChartConfig.backgroundsColor],
            selector: '#daily-pax-chart',
            type: 'pie',
            dataset: {
              ...defaultBarChartConfig.dataset,
              borderWidth: 12,
              borderRadius: 20,
              borderColor: colors['c_ash_100'],
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
      const total = innerArray.reduce((acc, curr) => acc + curr.pax, 0)
      return { vendor: innerArray[0].vendor, pax: total }
    })
    return {
      labels: paxByVendor.map((data => data.vendor)),
      records: paxByVendor.map(data => data.pax),
    }
  }
}

customElements.define('ui-daily-pax-chart', DailyPaxChart)
