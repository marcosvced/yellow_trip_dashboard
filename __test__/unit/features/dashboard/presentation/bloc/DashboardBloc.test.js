import { describe, vi, test, expect } from 'vitest'
import { DashboardBloc } from '@/features/dashboard/presentation/bloc/DashboardBloc.js'
import { DashboardState } from '@/features/dashboard/presentation/bloc/DashboardState.js'

describe('DashboardBloc', () => {
  test('should initialize with default state when no initial state is provided', () => {
    const bloc = new DashboardBloc()
    expect(bloc.state.value.data).toEqual({ summary: [] })
    expect(bloc.state.value.isLoading).toBe(false)
    expect(bloc.state.value.errors).toEqual([])
  })

  test('should notify observer on state update', () => {
    const observer = vi.fn()
    const bloc = new DashboardBloc()
    bloc.subscribe(observer)

    const newState = new DashboardState({ data: [] })
    bloc.update(newState)

    expect(observer).toHaveBeenCalledWith(newState)
  })
})
