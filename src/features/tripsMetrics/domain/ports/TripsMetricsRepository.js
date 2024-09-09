import { Interface } from '../../../../core/common/shared/Interface.js'
import { MethodNotImplementedException } from '../../../../core/common/domain/models/Exception.js'

/** @interface */
export class TripsMetricsRepository extends Interface {
  constructor() {
    super(TripsMetricsRepository)
  }

  getHourlyData() {
    throw MethodNotImplementedException('getHourlyData')
  }
}
