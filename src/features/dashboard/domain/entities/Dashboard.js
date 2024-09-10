import { HourlyTripSummary } from '@/core/hourlyTripSummary/domain/entities/HourlyTripSummary.js'

export class Dashboard {
  /** @param {HourlyTripSummary[]} summary */
  constructor(summary) {
    this.summary = summary
  }
}
