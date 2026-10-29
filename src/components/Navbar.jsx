import { NavLink } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Home', icon: 'fa-house' },
  { to: '/image/compress', label: 'Image', icon: 'fa-image' },
  { to: '/pdf/merge', label: 'PDF', icon: 'fa-file-pdf' },
  { to: '/util/qr', label: 'Utility', icon: 'fa-wand-magic-sparkles' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 h-[72px] bg-surface/80 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-pink grid place-items-center text-white font-bold">M</div>
          <span className="font-bold text-ink tracking-tight">Multi-Tool</span>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive ? 'bg-accent-soft text-accent' : 'text-ink-muted hover:text-ink hover:bg-surface-alt'}`}>
              <i className={`fa-solid ${n.icon} mr-2`} />{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <span className="pill"><i className="fa-solid fa-shield-halved" /> Local only</span>
        </div>
      </div>
    </header>
  )
}
