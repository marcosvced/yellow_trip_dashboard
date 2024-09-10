import { describe, vi, test, expect } from 'vitest'
import { GetHourlyDataUseCase } from '@/features/dashboard/domain/useCases/GetHourlyDataUseCase.js'
import { TripSummary } from '@/core/tripSummary/domain/entities/TripSummary.js'
import { faker } from '@faker-js/faker'
import { TripSummaryFactory } from '@test/unit/common/fatories/TripSummaryFactory.js'

describe('GetHourlyDataUseCase - execute utilizes repository and transforms data to TripSummary objects', () => {
  test('should return TripSummary array when valid date is provided', async () => {
    const pickupDate = faker.date.between({ from: '2017-01-01', to: '2017-01-31' })
    const mockData = TripSummaryFactory.new().times(Math.floor(Math.random() * 100) + 1, { pickupDate })

    /** @type {DashboardRepository} */
    const mockRepository = {
      getHourlyData: vi.fn().mockResolvedValue(mockData),
    }

    const useCase = new GetHourlyDataUseCase(mockRepository)
    const result = await useCase.execute(pickupDate)

    expect(result).toHaveLength(mockData.length)
    result.forEach((r, index) => {
      expect(r).toBeInstanceOf(TripSummary)
      expect(r.vendor).toBe(mockData[index].vendor)
      expect(r.pickupDate).toBe(pickupDate)
    })
  })
})
