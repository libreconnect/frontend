import { ReactElement } from 'react'
import { PageHome } from '@libreconnect/pages/home'
interface RouterProps {
  path: string
  component: ReactElement
  protected: boolean
  layout?: boolean
}

export const ROUTER: RouterProps[] = [
  {
    protected: true,
    path: '/home/*',
    component: <PageHome />,
    layout: true
  }
]