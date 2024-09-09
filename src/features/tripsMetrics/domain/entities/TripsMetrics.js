import { HourlyTripSummary } from '@/core/hourlyTripSummary/domain/entities/HourlyTripSummary.js'

export class TripsMetrics {
  /** @param {HourlyTripSummary[]} summary */
  constructor(summary) {
    this.summary = summary
  }
}
