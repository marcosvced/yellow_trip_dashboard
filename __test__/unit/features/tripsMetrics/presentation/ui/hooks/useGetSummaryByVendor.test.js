import { test, describe, expect } from 'vitest'
import { HourlyTripSummaryFactory } from '@test/unit/common/fatories/HourlyTripSummaryFactory.js'
import useGetSummaryByVendor
  from '@/features/tripsMetrics/presentation/ui/hooks/useGetSummaryByVendor.js'

describe('useGetSummaryByVendor', () => {
  test('should group summaries by vendor correctly when vendors are distinct', () => {
    /** @type {HourlyTripSummary[]} */
    const summary = HourlyTripSummaryFactory.new().times(15)

    const result = useGetSummaryByVendor(summary)
    expect(result.flat()).toHaveLength(summary.length)
  })
})
