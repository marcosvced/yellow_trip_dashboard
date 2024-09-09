import { Component } from '@/core/common/presentation/models/Component.js'

import styles from './styles.module.css?inline'

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
                <li id="${entry.label.toLowerCase()}" class="${entry.isActive ? '-is-active' : ''}">
                    <a>
                        <span class="material-symbols-rounded">
                            ${entry.icon}
                        </span>
                        <span>${entry.label}</span>
                    </a>
                </li>
            `).join('')}
        </ul>
    </nav>`
  }

  styles() {
    return styles
  }
}

customElements.define('ui-navbar', Navbar)
