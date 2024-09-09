import { HourlyTripSummaryDto } from '@/core/hourlyTripSummary/data/dto/HourlyTripSummaryDto.js'
import { apiClient } from '@/core/common/data/models/ApiClient.js'
import { TripsMetricsRepository } from '../../domain/ports/TripsMetricsRepository.js'
import { TripsMetricsService } from '../services/TripsMetricsService.js'

export class TripsMetricsRepositoryImpl extends TripsMetricsRepository {
  constructor() {
    super()
    this.service = new TripsMetricsService()
  }

  /** @return {Promise<HourlyTripSummary[]>} */
  async getHourlyData(day, query = {}) {
    const params = this.service.getHourlyDataQuery(day, query)
    try {
      const { data } = await apiClient.get(`/v0/pipes/yellow_tripdata_2017_pipe.json`, params)
      return data.map(raw => new HourlyTripSummaryDto(raw).toDomain())
    }
    /** @type {DataException} */
    catch (exception) {
      throw new TripsMetricsBadRequestException(exception.error)
    }
  }
}

/**
 * @param {Error} error
 * @return {DataException}
 * */
export function TripsMetricsBadRequestException(error) {
  return {
    kind: 'TripsMetricsBadRequestException',
    error: new Error(error.message),
  }
}
