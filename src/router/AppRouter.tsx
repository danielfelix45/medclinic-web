
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router'

import { LoginPage } from '../features/auth/pages/LoginPage'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../features/auth/context/AuthContext'

function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <main>
      <h1>Dashboard - MedClinic</h1>

      <p>Bem-vindo, {user?.name}!</p>
      <p>Perfil: {user?.role}</p>

      <button type="button" onClick={handleLogout}>
        Sair
      </button>
    </main>
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
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
