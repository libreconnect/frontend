import { Route } from '@libreconnect/routes'
import PageGeneralFeature from './feature/page-general-feature'

export const ROUTER_HOME: Route[] = [
  {
    component: <PageGeneralFeature />,
    path: '/'
  }
]