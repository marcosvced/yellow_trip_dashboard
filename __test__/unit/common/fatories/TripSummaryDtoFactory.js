import { TripSummaryDto } from '@/core/tripSummary/data/dto/TripSummaryDto.js'
import { Factory } from './Factory.js'
import useToIsoDate from '../utils/useToIsoDate.js'

export class TripSummaryDtoFactory extends Factory {
  /** @return {TripSummaryDto} */
  create(extra = {}) {
    let { trip_date: fakeDate } = extra

    if (!fakeDate) {
      fakeDate = this.faker.date.between({ from: '2017-01-01', to: '2017-01-31' })
    }

    const trip_date = useToIsoDate(fakeDate)

    return new TripSummaryDto({
      vendorid: this.faker.number.int({ min: 1, max: 2 }),
      trip_date: `${trip_date}`,
      trip_hour: this.faker.number.int({ min: 0, max: 23 }),
      total_amount_per_hour: this.faker.finance.amount(),
      total_passengers_per_hour: this.faker.number.int({ min: 0, max: 999 }),
      total_distance_per_hour: this.faker.number.float(),
      ...extra,
    })
  }
}
