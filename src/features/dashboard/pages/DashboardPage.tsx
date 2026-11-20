
import { useEffect, useState } from 'react'
import {
  dashboardService,
  type DashboardStats,
} from '../services/dashboard.service'
import './DashboardPage.css'

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadStats() {
      try {
        const data = await dashboardService.getStats()

        if (active) {
          setStats(data)
        }
      } catch {
        if (active) {
          setError('Não foi possível carregar os indicadores.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadStats()

    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return <p>Carregando indicadores...</p>
  }

  if (error || !stats) {
    return <p role="alert">{error || 'Indicadores indisponíveis.'}</p>
  }

  const indicators = [
    { title: 'Pacientes cadastrados', value: stats.patients },
    { title: 'Médicos cadastrados', value: stats.doctors },
    { title: 'Consultas agendadas', value: stats.scheduledAppointments },
    { title: 'Consultas realizadas', value: stats.completedAppointments },
  ]

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <p>Visão geral da clínica</p>

      <div className="dashboard-grid">
        {indicators.map((indicator) => (
          <article className="dashboard-card" key={indicator.title}>
            <h3>{indicator.title}</h3>
            <strong>{indicator.value}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}
