
import { BrowserRouter, Route, Routes } from 'react-router'

function LoginPage() {
  return <h1>Login - MedClinic</h1>
}

function DashboardPage() {
  return <h1>Dashboard - MedClinic</h1>
}

function NotFoundPage() {
  return <h1>404 - Página não encontrada</h1>
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
