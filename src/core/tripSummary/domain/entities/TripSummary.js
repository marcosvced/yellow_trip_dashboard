import { Money } from '@/core/money/domain/entities/Money.js'

export class TripSummary {
  /**
   * @param {Object} hourlyTripSummary
   * @param {DateTime} hourlyTripSummary.pickupDate
   * @param {number} hourlyTripSummary.amount
   * @param {number} hourlyTripSummary.distance
   * @param {number} hourlyTripSummary.pax
   * @param {number} hourlyTripSummary.vendor
   */
  constructor({ pickupDate, amount, distance, pax, vendor }) {
    /** @type {DateTime} */
    this.pickupDate = pickupDate

    /** @type {Money} */
    this.amount = new Money({ value: amount })

    /** @type {number} */
    this.distance = distance

    /** @type {number} */
    this.pax = pax

    /** @type {number} */
    this.vendor = vendor
  }
}
