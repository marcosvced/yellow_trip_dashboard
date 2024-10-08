import { DateTime } from 'luxon'
import { DTO } from '@/core/common/data/dtos/DTO.js'
import { TripSummary } from '../../domain/entities/TripSummary.js'

export class TripSummaryDto extends DTO {
  constructor({
    vendorid,
                    trip_date,
                    trip_hour,
                    total_amount_per_hour,
                    total_passengers_per_hour,
                    total_distance_per_hour,
  }) {
    super()
    this.vendorid = vendorid
    this.trip_date = trip_date
    this.trip_hour = trip_hour
    this.total_amount_per_hour = total_amount_per_hour
    this.total_passengers_per_hour = total_passengers_per_hour
    this.total_distance_per_hour = total_distance_per_hour
  }

  /** @return TripSummary */
  toDomain() {
    const pickupDate = DateTime.fromISO(new Date(this.trip_date).toISOString(), { zone: 'America/New_York' }).set({ hour: this.trip_hour })
    return new TripSummary({
      vendor: this.vendorid,
      distance: this.total_distance_per_hour,
      amount: this.total_amount_per_hour,
      pickupDate,
      pax: this.total_passengers_per_hour,
    })
  }
}
