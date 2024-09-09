import useGetSummaryByVendor from '../../hooks/useGetSummaryByVendor.js'
import chartBarMixin, {
  defaultBarChartConfig,
} from '@/features/tripsMetrics/presentation/ui/components/mixins/chartMixin.js'
import { Component } from '@/core/common/presentation/models/Component.js'
import { context } from '@/core/common/presentation/models/Context.js'
import { useUpdateChart } from '@/core/common/presentation/hooks/useUpdateChart.js'
import { useOnMounted } from '@/core/common/presentation/hooks/useOnMounted.js'

import template from './index.template.html?raw'
import styles from './styles.module.css?raw'
import { useMoney } from '@/core/common/presentation/hooks/useMoney.js'

export class HourlyAmountChart extends Component {
  constructor() {
    super()
  }

  setup() {
    let chart = undefined

    useOnMounted(() => {
      /** @type {TripsMetricsBloc} */
      const bloc = context.inject('TripsMetricsBloc')
      bloc.subscribe(() => {
        const { labels, records } = this._getData(bloc.state.value.data.summary)
        if (!chart) {
          chart = chartBarMixin({
            labels,
            records,
            selector: '#hourly-amount-chart',
            options: {
              ...defaultBarChartConfig.options,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: value => useMoney({ value, currency: 'USD' }),
                  },
                },
              },
            },
          })
          return
        }
        useUpdateChart(chart, { records, labels })
      })
    })
  }

  template() {
    return template
  }

  styles() {
    return styles
  }

  _getData(summary) {
    const summaryByVendor = useGetSummaryByVendor(summary)
    const labels = summaryByVendor[0].map(trip => `${trip.pickupDate.hour.toString().padStart(2, '0')}:00`)
    const records = summaryByVendor.map(vendor => (vendor.map(trip => trip.amount.value)))
    return { labels, records }
  }
}

customElements.define('ui-hourly-amount-chart', HourlyAmountChart)
