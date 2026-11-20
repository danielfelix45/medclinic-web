
import { NavLink } from 'react-router'

const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Pacientes', path: '/pacientes' },
  { label: 'Médicos', path: '/medicos' },
  { label: 'Especialidades', path: '/especialidades' },
  { label: 'Consultas', path: '/consultas' },
  { label: 'Relatórios', path: '/relatorios' },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>MedClinic</h2>
        <span>Gestão de Clínicas</span>
      </div>

      <nav className="sidebar-nav" aria-label="Menu principal">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
