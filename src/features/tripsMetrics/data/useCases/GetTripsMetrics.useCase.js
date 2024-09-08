export class GetTripsMetricsUseCase {
  /** @param {TripsMetricsRepository} repository */
  constructor(repository) {
    this.repository = repository
  }

  /** @return {Promise<HourlyTripSummary[]>} */
  async execute(day) {
    /** @type {HourlyTripSummaryDto[]} */
    const tripsDto = await this.repository.getHourlyData(day)
    return tripsDto.map(dto => dto.toDomain())
  }
}
