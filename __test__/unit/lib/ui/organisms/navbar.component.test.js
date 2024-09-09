import '@/lib/ui/organisms/navbar/navbar.component.js'
import { WebComponent } from '@test/unit/common/utils/WebComponent.js'
import { expect } from 'vitest'
import { getByText } from '@testing-library/dom'
import '@testing-library/jest-dom'

describe('Navbar WebComponent', () => {
  test('should render Navbar with correct entries', async (browser) => {
    const wrapper = await WebComponent.mount('ui-navbar')

    const dashboardEntry = getByText(wrapper, 'Dashboard')
    const accountsEntry = getByText(wrapper, 'Accounts')
    const routesEntry = getByText(wrapper, 'Routes')

    expect(dashboardEntry).toBeInTheDocument()
    expect(accountsEntry).toBeInTheDocument()
    expect(routesEntry).toBeInTheDocument()
  })
})
