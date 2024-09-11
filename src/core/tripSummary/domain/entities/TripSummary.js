import { Money } from '@/core/money/domain/entities/Money.js'

export class TripSummary {
  /**
   * @param {Object} TripSummary
   * @param {DateTime} TripSummary.pickupDate
   * @param {number} TripSummary.amount
   * @param {number} TripSummary.distance
   * @param {number} TripSummary.pax
   * @param {number} TripSummary.vendor
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
