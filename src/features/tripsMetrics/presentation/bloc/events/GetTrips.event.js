import { TripsMetricsRepository } from '../../../data/repositories/TripsMetrics.repository.js'
import { GetTripsMetricsUseCase } from '../../../data/useCases/GetTripsMetrics.useCase.js'

export async function getTripsEvent(day) {
  const repository = new TripsMetricsRepository()
  const useCase = new GetTripsMetricsUseCase(repository)
  return useCase.execute(day)
}
