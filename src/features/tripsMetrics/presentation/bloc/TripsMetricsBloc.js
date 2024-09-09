import { TripsMetricsState } from './TripsMetricsState.js'
import { getTripsEvent } from './events/GetTripsEvent.js'
import useProxy from '@/core/common/presentation/hooks/useProxy.js'

export class TripsMetricsBloc {
  /** @param {State} [initialState] */
  constructor(initialState) {
    this._observers = []
    this.state = useProxy(new TripsMetricsState(initialState ?? {}), this._observers)
  }

  subscribe(observer) {
    this._observers.push(observer)
  }

  update(state) {
    this.state.value = state
  }

  /**
   * @param {'GetTripsEvent'} event
   * @param {object} [params]
   * @return {void}
   */
  async dispatch(event, params) {
    try {
      switch (event) {
        case 'GetTripsEvent':
          const { day } = params ?? {}
          const data = await getTripsEvent(day ?? '2017-01-01')
          this.update(new TripsMetricsState({ data }))
          break
        default:
          throw new Error(`Unhandled event type: ${event}`)
      }
    }
    /** @type {DataException | Error} */
    catch (e) {
      console.error(e)
    }
  }
}
