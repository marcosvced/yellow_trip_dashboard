import './style.css'
import {context} from "./src/core/common/presentation/models/Context.js";
import {TripsMetricsBloc} from "./src/features/tripsMetrics/presentation/bloc/TripsMetrics.bloc.js";
import {useSetSearchParams} from "./src/core/common/presentation/hooks/useSetSearchParams.js";
import {useGetSearchParams} from "./src/core/common/presentation/hooks/useGetSearchParams.js";

async function app() {

    const { filterBy } = useGetSearchParams(['filterBy'])
    context.provide('SelectedDate', filterBy?.day)

    const bloc = new TripsMetricsBloc()
    context.provide('TripsMetricsBloc', bloc)

    await bloc.dispatch('GetTripsEvent', {day: filterBy?.day})

    document.body.addEventListener('onCalendarChange', async (event) => {
        const {day} = event.detail
        await bloc.dispatch('GetTripsEvent', {day})
        useSetSearchParams('filterBy', {day})
    });

}

await app()
