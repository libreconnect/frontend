import { ReactElement } from 'react'

interface RouterProps {
  path: string
  component: ReactElement
  protected: boolean
  layout?: boolean
}

export const ROUTER: RouterProps[] = [
  {
    protected: true,
    path: '/home',
    component: <div>Home</div>,
    layout: true
  }
]