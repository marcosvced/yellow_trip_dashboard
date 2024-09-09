export class GetTripsMetricsUseCase {
  /** @param {TripsMetricsRepository} repository */
  constructor(repository) {
    this.repository = repository
  }

  /** @return {Promise<HourlyTripSummary[]>} */
  async execute(day) {
    return this.repository.getHourlyData(day)
  }
}
