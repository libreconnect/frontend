import { render } from '@testing-library/react'

import SharedContracts from './shared-contracts'

describe('SharedContracts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedContracts />)
    expect(baseElement).toBeTruthy()
  })
})
