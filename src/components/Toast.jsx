/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function useToast() { return useContext(ToastContext) }

const icons = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' }
const colors = { success: 'text-success', error: 'text-danger', info: 'text-accent' }

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])

  const push = useCallback((type, msg) => {
    const id = Date.now() + Math.random()
    setItems((p) => [...p, { id, type, msg }])
    setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 3000)
  }, [])

  const toast = {
    success: (m) => push('success', m),
    error: (m) => push('error', m),
    info: (m) => push('info', m),
  }

  const remove = (id) => setItems((p) => p.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        {items.map((t) => (
          <div key={t.id} style={{ animation: 'fade-up 300ms ease-out' }} className="card flex items-center gap-3 px-4 py-3 min-w-[240px] shadow-[var(--shadow-lift)]">
            <i className={`fa-solid ${icons[t.type]} ${colors[t.type]}`} />
            <span className="text-sm text-ink flex-1">{t.msg}</span>
            <button className="btn-ghost px-1 py-1" onClick={() => remove(t.id)}><i className="fa-solid fa-xmark text-xs" /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
