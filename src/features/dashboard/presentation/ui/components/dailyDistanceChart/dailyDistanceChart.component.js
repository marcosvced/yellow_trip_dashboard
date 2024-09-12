import { Component } from '@/core/common/presentation/models/Component.js'
import template from './index.template.html?raw'
import { useOnMounted } from '@/core/common/presentation/hooks/useOnMounted.js'
import { context } from '@/core/common/presentation/models/Context.js'
import useGetSummaryByVendor from '@/features/dashboard/presentation/ui/hooks/useGetSummaryByVendor.js'
import chartBarMixin, {
  defaultBarChartConfig,
} from '@/features/dashboard/presentation/ui/mixins/chartMixin.js'
import { useUpdateChart } from '@/core/common/presentation/hooks/useUpdateChart.js'

export class DailyDistanceChart extends Component {
  constructor() {
    super()
  }

  setup() {
    let chart = undefined
    useOnMounted(() => {
      const bloc = context.inject('DashboardBloc')
      bloc.subscribe(() => {
        const { labels, records } = this._getData(bloc.state.value.data.summary)
        if (!chart) {
          chart = chartBarMixin(
            this.shadowRoot.querySelector('#daily-distance-chart'),
            {
              labels,
              records: [records],
              backgroundsColor: [defaultBarChartConfig.backgroundsColor],
              dataset: {
                ...defaultBarChartConfig.dataset, borderSkipped: false,
              },
              options: {
                ...defaultBarChartConfig.options,
                aspectRatio: 4,
                scales: {
                  y: {
                    display: false,
                  },
                  x: {
                    display: false,
                  },
                },
                indexAxis: 'y',
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

  styles() {
    return `.o-daily-distance-chart__wrapper { width: 100%;}`
  }

  _getData(summary) {
    const summaryByVendor = useGetSummaryByVendor(summary)
    const distanceByVendor = summaryByVendor.map((innerArray) => {
      const total = innerArray.reduce((acc, curr) => acc + curr.distance, 0)
      return {
        vendor: innerArray[0].vendor,
        distance: Math.round(total * 100) / 100,
      }
    })
    const labels = distanceByVendor.map((data => data.vendor))
    const records = distanceByVendor.map(data => data.distance)
    return { labels, records }
  }
}

customElements.define('ui-daily-distance-chart', DailyDistanceChart)
