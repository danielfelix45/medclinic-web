import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router'

import { LoginPage } from '../features/auth/pages/LoginPage'
import { useAuth } from '../features/auth/context/AuthContext'
import { ProtectedRoute } from './ProtectedRoute'
import { AppLayout } from '../components/layout/AppLayout'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'

function ModulePage({ title }: { title: string }) {
  return (
    <section>
      <h2>{title}</h2>
      <p>Módulo em desenvolvimento.</p>
    </section>
  )
}

function LoginRoute() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <LoginPage />
}

function NotFoundPage() {
  return <h1>404 - Página não encontrada</h1>
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoute />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route
              path="/pacientes"
              element={<ModulePage title="Pacientes" />}
            />

            <Route
              path="/medicos"
              element={<ModulePage title="Médicos" />}
            />

            <Route
              path="/especialidades"
              element={<ModulePage title="Especialidades" />}
            />

            <Route
              path="/consultas"
              element={<ModulePage title="Consultas" />}
            />

            <Route
              path="/relatorios"
              element={<ModulePage title="Relatórios" />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
