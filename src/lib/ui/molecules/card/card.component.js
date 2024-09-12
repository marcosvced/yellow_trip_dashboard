import { Component } from '@/core/common/presentation/models/Component.js'

import styles from './styles.module.css?raw'
import template from './index.template.html?raw'
import { usePropsOnTemplate } from '@/core/common/presentation/hooks/usePropsOnTemplate.js'

class Card extends Component {
  static tag = 'ui-card'

  static get observedAttributes() {
    return ['title', 'subtitle', 'icon']
  }

  template() {
    return usePropsOnTemplate({
      title: this.title,
      subtitle: this.subtitle,
      icon: this.icon,
    }, template)
  }

  styles = () => styles
}

customElements.define(Card.tag, Card)
