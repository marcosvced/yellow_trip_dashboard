import { describe, vi, test, expect } from 'vitest'
import { TripsMetricsBloc } from '../../../../../../src/features/tripsMetrics/presentation/bloc/TripsMetricsBloc.js'
import { TripsMetricsState } from '../../../../../../src/features/tripsMetrics/presentation/bloc/TripsMetricsState.js'

describe('TripsMetricsBloc', () => {
  test('should initialize with default state when no initial state is provided', () => {
    const bloc = new TripsMetricsBloc()
    expect(bloc.state.value.data).toEqual({ summary: [] })
    expect(bloc.state.value.isLoading).toBe(false)
    expect(bloc.state.value.errors).toEqual([])
  })

  test('should notify observer on state update', () => {
    const observer = vi.fn()
    const bloc = new TripsMetricsBloc()
    bloc.subscribe(observer)

    const newState = new TripsMetricsState({ data: [] })
    bloc.update(newState)

    expect(observer).toHaveBeenCalledWith(newState)
  })
})
