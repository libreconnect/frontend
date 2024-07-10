import { Route, Routes } from 'react-router-dom'
import { ROUTER_HOME } from './router'

export function PageHome() {
  return (
    <Routes>
      {ROUTER_HOME.map((route) => (
        <Route 
          key={route.path}
          path={route.path}
          element={route.component}
        />
      ))} 
    </Routes>
  )
}