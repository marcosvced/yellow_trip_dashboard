import { HourlyTripSummaryDto } from '../../../../src/core/hourlyTripSummary/data/dto/HourlyTripSummaryDto.js'
import { Factory } from './Factory.js'
import { DateTime } from 'luxon'
import useToIsoDate from '../utils/useToIsoDate.js'
import { HourlyTripSummary } from '../../../../src/core/hourlyTripSummary/domain/entities/HourlyTripSummary.js'

export class HourlyTripSummaryFactory extends Factory {
  /** @return {HourlyTripSummary} */
  create(extra = {}) {
    let { pickupDate } = extra

    if (!pickupDate) {
      pickupDate = this.faker.date.between({ from: '2017-01-01', to: '2017-01-31' })
    }

    return new HourlyTripSummary({
      pickupDate,
      amount: this.faker.finance.amount(),
      distance: this.faker.number.float(),
      pax: this.faker.number.int({ min: 0, max: 999 }),
      vendor: this.faker.number.int({ min: 1, max: 2 }),
    })
  }
}
