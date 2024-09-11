import './src/lib/assets/styles/style.css'
import { context } from '@/core/common/presentation/models/Context.js'
import { DashboardBloc } from '@/features/dashboard/presentation/bloc/DashboardBloc.js'
import { useSetSearchParams } from '@/core/common/presentation/hooks/useSetSearchParams.js'
import { useGetSearchParams } from '@/core/common/presentation/hooks/useGetSearchParams.js'

function providePalette() {
  const palette = {}
  Array.from(document.styleSheets).forEach((sheet) => {
    Array.from(sheet.cssRules).forEach((rule) => {
      if (rule.selectorText === ':root') {
        Array.from(rule.style).forEach((prop) => {
          if (prop.startsWith('--c')) {
            palette[prop.replace('--', '').replaceAll('-', '_')] = rule.style.getPropertyValue(prop).trim()
          }
        })
      }
    })
  })
  context.provide('palette', palette)
}

/** @param {DashboardBloc} bloc */
function calendarChangeHandler(bloc) {
  document.body.addEventListener('onCalendarChange', async (event) => {
    const { day } = event.detail
    await bloc.dispatch('GetTripsEvent', { day })
    useSetSearchParams('filterBy', { day })
  })
}

function app() {
  const { filterBy } = useGetSearchParams(['filterBy'])
  context.provide('SelectedDate', filterBy?.day)

  const bloc = new DashboardBloc()
  context.provide('DashboardBloc', bloc)

  bloc.dispatch('GetTripsEvent', { day: filterBy?.day })

  providePalette()
  calendarChangeHandler(bloc)
}

app()
