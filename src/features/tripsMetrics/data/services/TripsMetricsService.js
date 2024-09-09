export class TripsMetricsService {
  /**
     * @param {string} day 'YYYY-MM-DD'
     * @param {Object} options Additional options for consultation
     * @param {string[]} options.fields Fields to select
     * @param {string} options.where where clause
     * @param {string[]} options.groupBy Group by clause
     * @param {string[]} options.orderBy Field to sort by
     * @return {Object} Parameters for the query
     */
  _buildQuery(day, options = {}) {
    const {
      fields,
      table = '_',
      where,
      groupBy,
      orderBy,
    } = options

    let query = `SELECT ${fields.join(', ')} FROM ${table} ${where}`

    if (groupBy) {
      query += `GROUP BY  ${groupBy.join(', ')}`
    }

    query += `ORDER BY ${orderBy.join(', ')}`

    return { q: query }
  }

  getHourlyDataQuery(day, options = {}) {
    const datesRange = [`${day} 00:00:00`, `${day} 23:59:59`]

    return this._buildQuery(day, {
      fields: [
        'vendorid',
        'DATE(tpep_pickup_datetime) AS trip_date',
        'HOUR(tpep_pickup_datetime) AS trip_hour',
        'SUM(total_amount) AS total_amount_per_hour',
        'SUM(passenger_count) AS total_passengers_per_hour',
        'SUM(trip_distance) AS total_distance_per_hour',
      ],
      where: `WHERE tpep_pickup_datetime BETWEEN '${datesRange[0]}' AND '${datesRange[1]}'`,
      groupBy: ['vendorid', 'DATE(tpep_pickup_datetime)', 'HOUR(tpep_pickup_datetime)'],
      orderBy: ['trip_date', ' trip_hour', ' vendorid'],
      ...options,
    })
  }
}
