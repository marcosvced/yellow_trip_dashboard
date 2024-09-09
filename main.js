import './src/lib/assets/styles/style.css'
import { context } from '@/core/common/presentation/models/Context.js'
import { TripsMetricsBloc } from '@/features/tripsMetrics/presentation/bloc/TripsMetricsBloc.js'
import { useSetSearchParams } from '@/core/common/presentation/hooks/useSetSearchParams.js'
import { useGetSearchParams } from '@/core/common/presentation/hooks/useGetSearchParams.js'

function app() {
  const { filterBy } = useGetSearchParams(['filterBy'])
  context.provide('SelectedDate', filterBy?.day)

  const bloc = new TripsMetricsBloc()
  context.provide('TripsMetricsBloc', bloc)

  bloc.dispatch('GetTripsEvent', { day: filterBy?.day })

  document.body.addEventListener('onCalendarChange', async (event) => {
    const { day } = event.detail
    await bloc.dispatch('GetTripsEvent', { day })
    useSetSearchParams('filterBy', { day })
  })
}

app()
