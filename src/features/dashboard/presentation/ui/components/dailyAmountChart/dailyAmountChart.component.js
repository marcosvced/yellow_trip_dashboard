import { Component } from '@/core/common/presentation/models/Component.js'
import template from './index.template.html?raw'
import { useOnMounted } from '@/core/common/presentation/hooks/useOnMounted.js'
import { context } from '@/core/common/presentation/models/Context.js'
import useGetSummaryByVendor from '@/features/dashboard/presentation/ui/hooks/useGetSummaryByVendor.js'
import chartMixin, {
  defaultBarChartConfig,
} from '@/features/dashboard/presentation/ui/mixins/chartMixin.js'
import { useUpdateChart } from '@/core/common/presentation/hooks/useUpdateChart.js'
export class DailyAmountChart extends Component {
  constructor() {
    super()
  }

  setup() {
    let chart = undefined
    useOnMounted(() => {
      const bloc = context.inject('DashboardBloc')
      const colors = context.inject('palette')
      bloc.subscribe(() => {
        const { labels, records } = this._getData(bloc.state.value.data.summary)
        if (!chart) {
          chart = chartMixin(
            this.shadowRoot.querySelector('#daily-amount-chart'),
            {
              labels,
              records: [records],
              backgroundsColor: [defaultBarChartConfig.backgroundsColor],
              type: 'doughnut',
              dataset: {
                ...defaultBarChartConfig.dataset,
                borderWidth: 16,
                borderRadius: 20,
                borderColor: colors['c_ash_200'],
                hoverBorderColor: colors['c_ash_200'],
              },
              options: {
                ...defaultBarChartConfig.options,
                aspectRatio: 1,
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
