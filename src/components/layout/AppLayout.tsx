
import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import './AppLayout.css'

export function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-content">
        <Header />

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
