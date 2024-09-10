import { DashboardRepositoryImpl } from '../../../data/repositories/DashboardRepositoryImpl.js'
import { GetHourlyDataUseCase } from '../../../domain/useCases/GetHourlyDataUseCase.js'

export async function getTripsEvent(day) {
  const repository = new DashboardRepositoryImpl()
  const useCase = new GetHourlyDataUseCase(repository)
  return useCase.execute(day)
}
