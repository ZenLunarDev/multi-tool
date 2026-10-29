import { useState, useEffect } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Dropzone from '../components/Dropzone.jsx'

const algs = ['SHA-1', 'SHA-256', 'SHA-512']

async function digest(alg, data) {
  const buf = await crypto.subtle.digest(alg, data)
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function HashTool() {
  const [mode, setMode] = useState('file')
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [hashes, setHashes] = useState({})
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (mode !== 'text') return
    const t = setTimeout(async () => {
      const data = new TextEncoder().encode(text)
      const r = {}
      for (const a of algs) r[a] = await digest(a, data)
      setHashes(r)
    }, 300)
    return () => clearTimeout(t)
  }, [text, mode])

  const onFile = async (files) => {
    const f = files[0]; setFile(f); setBusy(true)
    const data = await f.arrayBuffer()
    const r = {}
    for (const a of algs) r[a] = await digest(a, data)
    setHashes(r); setBusy(false)
  }

  const copy = (v) => navigator.clipboard.writeText(v)

  return (
    <ToolLayout title="Hash & Checksum" description="คำนวณ hash จากไฟล์หรือข้อความ">
      <div className="flex gap-2">
        {['file', 'text'].map((m) => (
          <button key={m} onClick={() => { setMode(m); setHashes({}); setFile(null) }} className={`px-4 py-2 rounded-full text-sm font-medium ${mode === m ? 'bg-accent text-white' : 'bg-surface-alt text-ink-muted'}`}>
            {m === 'file' ? 'ไฟล์' : 'ข้อความ'}
          </button>
        ))}
      </div>
      {mode === 'file' && !file && <Dropzone accept="*/*" onFiles={onFile} hint="ไฟล์ใดก็ได้" />}
      {mode === 'file' && file && (
        <div className="card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink truncate">{file.name}</span>
            <span className="text-xs text-ink-muted tabular">{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        </div>
      )}
      {mode === 'text' && <textarea className="input h-32 font-mono resize-none" value={text} onChange={(e) => setText(e.target.value)} placeholder="พิมพ์ข้อความ..." />}
      {busy && <div className="text-ink-muted text-sm">กำลังคำนวณ...</div>}
      {Object.keys(hashes).length > 0 && (
        <div className="card space-y-3">
          {algs.map((a) => (
            <div key={a} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-ink-muted w-20">{a}</span>
              <code className="flex-1 text-xs tabular text-ink break-all">{hashes[a]}</code>
              <button className="btn-ghost px-2" onClick={() => copy(hashes[a])}><i className="fa-solid fa-copy" /></button>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  )
}
