import { describe, expect, test, vi } from 'vitest'
import { apiClient } from '@/core/common/data/models/ApiClient.js'
import {
  DashboardRepositoryImpl,
} from '@/features/dashboard/data/repositories/DashboardRepositoryImpl.js'
import { faker } from '@faker-js/faker'
import useToIsoDate from '@test/unit/common/utils/useToIsoDate.js'
import { TripSummaryDtoFactory } from '@test/unit/common/fatories/TripSummaryDtoFactory.js'
import { TripSummary } from '@/core/tripSummary/domain/entities/TripSummary.js'

describe('DashboardRepositoryImpl - fetches and maps trip data', () => {
  test('should return an empty array when no trip data is available for the given day', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({ data: [] })

    const repository = new DashboardRepositoryImpl()
    const trip_date = TripSummaryDtoFactory.new().create().trip_date
    const result = await repository.getHourlyData(trip_date)

    expect(result).toHaveLength(0)
  })

  test('should return an array of TripSummary objects when a valid date is provided', async () => {
    const trip_date = faker.date.between({ from: '2017-01-01', to: '2017-01-31' })
    const mockResultLength = 3
    const mockData = TripSummaryDtoFactory.new().times(mockResultLength, { trip_date })

    vi.spyOn(apiClient, 'get').mockResolvedValue({ data: mockData })

    const repository = new DashboardRepositoryImpl()
    const result = await repository.getHourlyData(useToIsoDate(trip_date))

    expect(result).toHaveLength(mockResultLength)
    result.forEach((r, index) => {
      expect(r).toBeInstanceOf(TripSummary)
      expect(r.vendor).toBe(mockData[index].vendorid)
    })
  })
})
