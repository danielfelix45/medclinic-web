
import { useNavigate } from 'react-router'
import { useAuth } from '../../features/auth/context/AuthContext'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <header className="app-header">
      <div>
        <h1>Painel Administrativo</h1>
        <p>Bem-vindo, {user?.name}!</p>
      </div>

      <div className="header-user">
        <span>{user?.role}</span>

        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  )
}
