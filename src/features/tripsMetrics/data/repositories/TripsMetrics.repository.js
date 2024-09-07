import { HourlyTripSummaryDto } from '../../../../core/hourlyTripSummary/data/dto/HourlyTripSummary.dto.js'
import {apiClient} from "../../../../core/common/data/models/ApiClient.js";

export class TripsMetricsRepository {
  /** @return {Promise<HourlyTripSummaryDto[]>} */
  async getHourlyData(day = '2017-01-31') {
    const datesRange = [`${day} 00:00:00`, `${day} 23:59:59`]
    const params = {
      q: `SELECT
            vendorid,
            DATE(tpep_pickup_datetime) AS trip_date,
            HOUR(tpep_pickup_datetime) AS trip_hour,
            SUM(total_amount) AS total_amount_per_hour,
            SUM(passenger_count) AS total_passengers_per_hour,
            SUM(trip_distance) AS total_distance_per_hour
          FROM
            _
          WHERE
            tpep_pickup_datetime BETWEEN '${datesRange[0]}' AND '${datesRange[1]}'
          GROUP BY
            vendorid,
            DATE(tpep_pickup_datetime),
            HOUR(tpep_pickup_datetime)
          ORDER BY
            trip_date,
            trip_hour,
            vendorid`,
    }
    const { data } = await apiClient.get(`${import.meta.env.VITE_API_BASE_URL}/yellow_tripdata_2017_pipe.json`, params)
    return data.map(raw => new HourlyTripSummaryDto(raw))
  }
}
