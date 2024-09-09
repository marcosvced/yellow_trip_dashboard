import { calendarToggle as Calendar } from 'datedreamer'
import { Component } from '../../../../core/common/presentation/models/Component.js'
import { useOnMounted } from '../../../../core/common/presentation/hooks/useOnMounted.js'

import styles from './styles.module.css?raw'
import { context } from '../../../../core/common/presentation/models/Context.js'

class DatePicker extends Component {
  static get observedAttributes() {
    return ['default-date']
  }

  constructor() {
    super()
  }

  attributeChangedCallback(date, oldValue, newValue) {
    this['default-date'] = newValue
    this.render()
  }

  setup() {
    useOnMounted(() => {
      const selectedDate = context.inject('SelectedDate') ?? this['default-date']
      new Calendar({
        element: '#my-calendar',
        theme: 'lite-purple',
        selectedDate,
        format: 'YYYY-MM-DD',
        styles,
        onChange: async (event) => {
          const { detail: day } = event
          const onCalendarChange = new CustomEvent('onCalendarChange', { detail: { day } })
          document.body.dispatchEvent(onCalendarChange)
        },
      })
    })
  }

  template() {
    return '<div id="my-calendar"></div>'
  }
}
customElements.define('ui-date-picker', DatePicker)
