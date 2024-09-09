import { describe, vi, test, expect } from 'vitest'
import { GetTripsMetricsUseCase } from '@/features/tripsMetrics/domain/useCases/GetTripsMetricsUseCase.js'
import { HourlyTripSummary } from '@/core/hourlyTripSummary/domain/entities/HourlyTripSummary.js'
import { faker } from '@faker-js/faker'
import { HourlyTripSummaryFactory } from '@test/unit/common/fatories/HourlyTripSummaryFactory.js'

describe('GetTripsMetricsUseCase - execute utilizes repository and transforms data to HourlyTripSummary objects', () => {
  test('should return HourlyTripSummary array when valid date is provided', async () => {
    const pickupDate = faker.date.between({ from: '2017-01-01', to: '2017-01-31' })
    const mockData = HourlyTripSummaryFactory.new().times(Math.floor(Math.random() * 100) + 1, { pickupDate })

    /** @type {TripsMetricsRepository} */
    const mockRepository = {
      getHourlyData: vi.fn().mockResolvedValue(mockData),
    }

    const useCase = new GetTripsMetricsUseCase(mockRepository)
    const result = await useCase.execute(pickupDate)

    expect(result).toHaveLength(mockData.length)
    result.forEach((r, index) => {
      expect(r).toBeInstanceOf(HourlyTripSummary)
      expect(r.vendor).toBe(mockData[index].vendor)
      expect(r.pickupDate).toBe(pickupDate)
    })
  })
})
