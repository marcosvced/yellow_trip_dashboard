import {Component} from "../../../../core/common/presentation/models/Component.js";
import {useOnMounted} from "../../../../core/common/presentation/hooks/useOnMounted.js";
import {context} from "../../../../core/common/presentation/models/Context.js";

import styles from "./styles.module.css?raw";

class Navbar extends Component {
    constructor() {
        super()

        this.entries = [
            {
                icon: 'i',
                label: 'Dashboard',
            },
            {
                icon: 'i',
                label: 'Accounts',
            },
            {
                icon: 'i',
                label: 'Routes',
            },
        ]
    }


    template() {
        return `
    <nav class="navbar" role="navigation">
        <ul>
            ${this.entries.map(entry => `
                <li id=${'"' + entry.label.toLowerCase() + '"'}>
                    <span>${entry.icon}</span>
                    <span>${entry.label}</span>
                </li>
            `).join('')}
        </ul>
    </nav>`
    }

    async styles() {
        return styles
    }
}

customElements.define('ui-navbar', Navbar)
