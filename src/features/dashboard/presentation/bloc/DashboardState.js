import { Dashboard } from '../../domain/entities/Dashboard.js'

export class DashboardState {
  /**
   * @param {State} state
   * @param {TripSummary[]} state.data
   * @param {Errors} [state.errors]
   * @param {boolean} [state.isLoading]
   */
  constructor({ errors, isLoading, data }) {
    this.data = new Dashboard(data ?? [])
    this.isLoading = isLoading ?? false
    this.errors = errors ?? []
  }
}
