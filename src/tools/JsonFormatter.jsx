import { useState, useEffect } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'

export default function JsonFormatter() {
  const [raw, setRaw] = useState('')
  const [out, setOut] = useState('')
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (!raw.trim()) { setStatus(null); return }
      try { JSON.parse(raw); setStatus({ ok: true }) }
      catch (e) { setStatus({ ok: false, msg: e.message }) }
    }, 300)
    return () => clearTimeout(t)
  }, [raw])

const pretty = () => { try { setOut(JSON.stringify(JSON.parse(raw), null, 2)) } catch { setOut('') } }
  const minify = () => { try { setOut(JSON.stringify(JSON.parse(raw))) } catch { setOut('') } }
  const clear = () => { setRaw(''); setOut(''); setStatus(null) }
  const copy = async () => {
    await navigator.clipboard.writeText(out)
    setCopied(true); setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="JSON Formatter" description="จัดรูปแบบ ย่อ และตรวจสอบ JSON">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea className="input h-80 font-mono resize-none" value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="วาง JSON ที่นี่..." />
        <textarea className="input h-80 font-mono resize-none" value={out} readOnly placeholder="ผลลัพธ์..." />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <button className="btn-primary" onClick={pretty}>จัดรูปแบบ</button>
        <button className="btn-ghost" onClick={minify}>Minify</button>
        <button className="btn-ghost" onClick={clear}>ล้าง</button>
        <button className="btn-ghost" onClick={copy} disabled={!out}>{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</button>
        {status && <span className={`text-sm ${status.ok ? 'text-success' : 'text-danger'}`}>{status.ok ? '✓ valid' : status.msg}</span>}
      </div>
    </ToolLayout>
  )
}
