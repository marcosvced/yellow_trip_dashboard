import { test, describe, expect } from 'vitest'
import { TripSummaryFactory } from '@test/unit/common/fatories/TripSummaryFactory.js'
import useGetSummaryByVendor
  from '@/features/dashboard/presentation/ui/hooks/useGetSummaryByVendor.js'

describe('useGetSummaryByVendor', () => {
  test('should group summaries by vendor correctly when vendors are distinct', () => {
    /** @type {HourlyTripSummary[]} */
    const summary = TripSummaryFactory.new().times(15)

    const result = useGetSummaryByVendor(summary)
    expect(result.flat()).toHaveLength(summary.length)
  })
})
