import { TripSummaryDto } from '@/core/tripSummary/data/dto/TripSummaryDto.js'
import { apiClient } from '@/core/common/data/models/ApiClient.js'
import { DashboardRepository } from '../../domain/ports/DashboardRepository.js'
import { DashboardService } from '../services/DashboardService.js'

export class DashboardRepositoryImpl extends DashboardRepository {
  constructor() {
    super()
    this.service = new DashboardService()
  }

  /** @return {Promise<TripSummary[]>} */
  async getHourlyData(day, query = {}) {
    const params = this.service.getHourlyDataQuery(day, query)
    try {
      const { data } = await apiClient.get(`/v0/pipes/yellow_tripdata_2017_pipe.json`, params)
      return data.map(raw => new TripSummaryDto(raw).toDomain())
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
