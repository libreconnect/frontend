import { PropsWithChildren } from 'react'
import LayoutPage from '../ui/layout-page'

export interface LayoutProps {
  topbar?: boolean
}

export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <LayoutPage>
      {children}
    </LayoutPage>
  )
}