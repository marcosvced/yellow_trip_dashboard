import { Factory } from './Factory.js'
import { TripSummary } from '@/core/tripSummary/domain/entities/TripSummary.js'

export class TripSummaryFactory extends Factory {
  /** @return {TripSummary} */
  create(extra = {}) {
    let { pickupDate } = extra

    if (!pickupDate) {
      pickupDate = this.faker.date.between({ from: '2017-01-01', to: '2017-01-31' })
    }

    return new TripSummary({
      pickupDate,
      amount: this.faker.finance.amount(),
      distance: this.faker.number.float(),
      pax: this.faker.number.int({ min: 0, max: 999 }),
      vendor: this.faker.number.int({ min: 1, max: 2 }),
    })
  }
}
