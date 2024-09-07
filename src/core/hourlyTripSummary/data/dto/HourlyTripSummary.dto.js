import { HourlyTripSummary } from '../../domain/entities/HourlyTripSummary.js'
import { DateTime } from 'luxon'

export class HourlyTripSummaryDto {
  constructor({
    vendorid,
    trip_date,
    trip_hour,
    total_amount_per_hour,
    total_passengers_per_hour,
    total_distance_per_hour,
  }) {
    this.vendorid = vendorid
    this.trip_date = trip_date
    this.trip_hour = trip_hour
    this.total_amount_per_hour = total_amount_per_hour
    this.total_passengers_per_hour = total_passengers_per_hour
    this.total_distance_per_hour = total_distance_per_hour
  }

  toDomain() {
    const pickupDateTime = `${this.trip_date} ${this.trip_hour.toString().padStart(2, '0')}:00:00`
    return new HourlyTripSummary({
      vendor: this.vendorid,
      distance: this.total_distance_per_hour,
      amount: this.total_amount_per_hour,
      pickupDate: DateTime.fromFormat(pickupDateTime, 'yyyy-MM-dd HH:mm:ss', { zone: 'America/New_York' }),
      pax: this.total_passengers_per_hour,
    })
  }
}
