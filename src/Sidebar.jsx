import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const groups = [
  { name: 'IMAGE', items: [{ to: '/image/compress', label: 'Compress' }, { to: '/image/convert', label: 'Convert' }] },
  { name: 'PDF', items: [{ to: '/pdf/merge', label: 'Merge' }, { to: '/pdf/split', label: 'Split' }] },
  { name: 'UTILITY', items: [{ to: '/util/qr', label: 'QR' }, { to: '/util/json', label: 'JSON' }, { to: '/util/hash', label: 'Hash' }] },
]

function Group({ g }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-2">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-dim tracking-wider">
        <span>{g.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && g.items.map((i) => (
        <NavLink key={i.to} to={i.to} className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-accent-soft text-white' : 'text-muted hover:bg-hover hover:text-text'}`}>
          {i.label}
        </NavLink>
      ))}
    </div>
  )
}

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 h-screen bg-panel border-r border-border p-3 overflow-y-auto">
      <div className="px-3 py-4 text-lg font-semibold tracking-tight">Multi-Tool</div>
      {groups.map((g) => <Group key={g.name} g={g} />)}
    </aside>
  )
}
