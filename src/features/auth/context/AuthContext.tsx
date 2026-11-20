
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { authService } from '../services/auth.service'
import { setAccessToken } from '../../../services/api/client'
import type {
  AuthUser,
  LoginCredentials,
} from '../types/auth.types'

interface AuthContextData {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  async function login(credentials: LoginCredentials) {
    const { token } = await authService.login(credentials)

    if (!token) {
      throw new Error('Token não retornado pela API')
    }

    setAccessToken(token)

    try {
      const authenticatedUser = await authService.getMe()
      setUser(authenticatedUser)
    } catch (error) {
      setAccessToken(null)
      setUser(null)
      throw error
    }
  }

  function logout() {
    setAccessToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de AuthProvider')
  }

  return context
}
