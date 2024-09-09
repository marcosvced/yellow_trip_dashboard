import { TripsMetricsRepositoryImpl } from '../../../data/repositories/TripsMetricsRepositoryImpl.js'
import { GetTripsMetricsUseCase } from '../../../domain/useCases/GetTripsMetricsUseCase.js'

export async function getTripsEvent(day) {
  const repository = new TripsMetricsRepositoryImpl()
  const useCase = new GetTripsMetricsUseCase(repository)
  return useCase.execute(day)
}
