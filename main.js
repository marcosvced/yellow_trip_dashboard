import './style.css'
import {context} from "./src/core/common/presentation/models/Context.js";
import {TripsMetricsBloc} from "./src/features/tripsMetrics/presentation/bloc/TripsMetrics.bloc.js";

async function init() {
    const bloc = new TripsMetricsBloc()
    context.provide('TripsMetricsBloc', bloc)
    await bloc.dispatch('GetTripsEvent', {day: '2017-01-03'})
}

await init()
