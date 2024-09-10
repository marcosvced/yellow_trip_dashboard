export class GetHourlyDataUseCase {
  /** @param {DashboardRepository} repository */
  constructor(repository) {
    this.repository = repository
  }

  /** @return {Promise<HourlyTripSummary[]>} */
  async execute(day) {
    return this.repository.getHourlyData(day)
  }
}
