export class GetHourlyDataUseCase {
  /** @param {DashboardRepository} repository */
  constructor(repository) {
    this.repository = repository
  }

  /** @return {Promise<TripSummary[]>} */
  async execute(day) {
    return this.repository.getHourlyData(day)
  }
}
