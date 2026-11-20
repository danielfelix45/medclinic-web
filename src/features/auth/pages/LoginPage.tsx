
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login({ email, password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('E-mail ou senha inválidos.')
        } else if (err.response?.status === 429) {
          setError('Muitas tentativas. Aguarde e tente novamente.')
        } else {
          setError('Não foi possível autenticar o usuário.')
        }
      } else {
        setError('Ocorreu um erro durante a autenticação.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>MedClinic</h1>
      <p>Sistema de Gestão de Clínicas</p>

      <h2>Entrar no sistema</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}
    </main>
  )
}
