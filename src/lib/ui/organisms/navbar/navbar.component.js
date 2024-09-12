import { Component } from '@/core/common/presentation/models/Component.js'

import css from './styles.module.css'
import styles from './styles.module.css?inline'
import '@/lib/ui/atoms/icon/icon.component.js'

export class Navbar extends Component {
  constructor() {
    super()

    this.entries = [
      {
        icon: 'home',
        label: 'Dashboard',
        isActive: true,
      },
      {
        icon: 'group',
        label: 'Accounts',
        isActive: false,
      },
      {
        icon: 'route',
        label: 'Routes',
        isActive: false,
      },
    ]
  }

  template() {
    return `
    <nav class="navbar" role="navigation">
        <ul>
            ${this.entries.map(entry => `
                <li id="${entry.label.toLowerCase()}" class="${entry.isActive ? css['-is-active'] : ''}">
                    <a>
                        <span class="${css['icon']}">
                            <ui-icon  icon="${entry.icon}"></ui-icon>
                        </span>
                        <span>${entry.label}</span>
                    </a>
                </li>
            `).join('')}
        </ul>
    </nav>`
  }

  styles = () => styles
}

customElements.define('ui-navbar', Navbar)
