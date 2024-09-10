import './src/lib/assets/styles/style.css'
import { context } from '@/core/common/presentation/models/Context.js'
import { DashboardBloc } from '@/features/dashboard/presentation/bloc/DashboardBloc.js'
import { useSetSearchParams } from '@/core/common/presentation/hooks/useSetSearchParams.js'
import { useGetSearchParams } from '@/core/common/presentation/hooks/useGetSearchParams.js'

function app() {
  const { filterBy } = useGetSearchParams(['filterBy'])
  context.provide('SelectedDate', filterBy?.day)

  const bloc = new DashboardBloc()
  context.provide('DashboardBloc', bloc)

  bloc.dispatch('GetTripsEvent', { day: filterBy?.day })

  document.body.addEventListener('onCalendarChange', async (event) => {
    const { day } = event.detail
    await bloc.dispatch('GetTripsEvent', { day })
    useSetSearchParams('filterBy', { day })
  })
}

app()
