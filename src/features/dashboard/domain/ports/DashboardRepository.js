import { Interface } from '@/core/common/shared/Interface.js'
import { MethodNotImplementedException } from '@/core/common/domain/models/Exception.js'

/** @interface */
export class DashboardRepository extends Interface {
  constructor() {
    super(DashboardRepository)
  }

  getHourlyData() {
    throw MethodNotImplementedException('getHourlyData')
  }
}
