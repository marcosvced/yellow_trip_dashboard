import { TripsMetrics } from '../../domain/entities/TripsMetrics.js'

export class TripsMetricsState {
  /**
   * @param {State} state
   * @param {HourlyTripSummary[]} state.data
   * @param {Errors} [state.errors]
   * @param {boolean} [state.isLoading]
   */
  constructor({ errors, isLoading, data }) {
    this.data = new TripsMetrics(data ?? [])
    this.isLoading = isLoading ?? false
    this.errors = errors ?? []
  }
}
