import { Component } from '@/core/common/presentation/models/Component.js'
import { usePropsOnTemplate } from '@/core/common/presentation/hooks/usePropsOnTemplate.js'

import css from './styles.module.css'
import styles from './styles.module.css?inline'

export class Icon extends Component {
  static tag = 'ui-icon'

  static get observedAttributes() {
    return ['icon']
  }

  styles = () => styles

  template() {
    return usePropsOnTemplate({ icon: this.icon },
      `<span class="${css['material-symbols-rounded']}">{{ icon }}</span>`,
    )
  }
}
customElements.define(Icon.tag, Icon)
