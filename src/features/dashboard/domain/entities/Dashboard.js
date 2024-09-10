import { TripSummary } from '@/core/tripSummary/domain/entities/TripSummary.js'

export class Dashboard {
  /** @param {TripSummary[]} summary */
  constructor(summary) {
    this.summary = summary
  }
}
