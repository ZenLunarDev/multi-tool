import { useState } from 'react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import ToolLayout from '../components/ToolLayout.jsx'
import Dropzone from '../components/Dropzone.jsx'

const fmts = [{ value: 'image/webp', label: 'WebP' }, { value: 'image/jpeg', label: 'JPG' }, { value: 'image/png', label: 'PNG' }]

export default function ImageConverter() {
  const [files, setFiles] = useState([])
  const [fmt, setFmt] = useState('image/webp')
  const [quality, setQuality] = useState(0.8)
  const [busy, setBusy] = useState(false)
  const [out, setOut] = useState([])
  const [err, setErr] = useState(null)

  const convert = async (f) => {
    const bmp = await createImageBitmap(f)
    const c = document.createElement('canvas')
    c.width = bmp.width; c.height = bmp.height
    c.getContext('2d').drawImage(bmp, 0, 0)
    return new Promise((res, rej) => c.toBlob((b) => b ? res(b) : rej(new Error('fail')), fmt, fmt === 'image/png' ? undefined : quality))
  }

  const run = async () => {
    if (!files.length) return
    setBusy(true); setErr(null); setOut([])
    const results = []; let fails = 0
    for (const f of files) {
      try {
        const blob = await convert(f)
        results.push({ name: f.name.replace(/\.[^.]+$/, '') + '.' + fmt.split('/')[1], blob, url: URL.createObjectURL(blob), size: blob.size })
      } catch { fails++ }
    }
    setOut(results)
    if (fails) setErr(`${fails} ไฟล์แปลงไม่สำเร็จ`)
    setBusy(false)
  }

  const zip = async () => {
    const z = new JSZip()
    out.forEach((r) => z.file(r.name, r.blob))
    const b = await z.generateAsync({ type: 'blob' })
    saveAs(b, 'converted.zip')
  }

  return (
    <ToolLayout title="Image Converter" description="แปลงรูปภาพในเบราว์เซอร์">
      <Dropzone accept="image/*" multiple onFiles={setFiles} />
      {files.length > 0 && (
        <div className="card space-y-4">
          <div className="flex gap-2 flex-wrap">
            {fmts.map((f) => (
              <button key={f.value} onClick={() => setFmt(f.value)} className={`px-4 py-2 rounded-full text-sm font-medium ${fmt === f.value ? 'bg-accent text-white' : 'bg-surface-alt text-ink-muted hover:text-ink'}`}>{f.label}</button>
            ))}
          </div>
          {fmt !== 'image/png' && (
            <div>
              <label className="text-xs text-dim">คุณภาพ {quality.toFixed(2)}</label>
              <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full" />
            </div>
          )}
          <button className="btn-primary w-full" disabled={busy} onClick={run}>{busy ? 'กำลังแปลง...' : 'แปลงทั้งหมด'}</button>
          {err && <div className="text-danger text-sm">{err}</div>}
        </div>
      )}
      {out.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-ink-muted">{out.length} ไฟล์</span>
            <button className="btn-ghost" onClick={zip}>ดาวน์โหลดทั้งหมด</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {out.map((r) => (
              <div key={r.url} className="card p-3 space-y-2">
                <img src={r.url} alt={r.name} className="w-full h-24 object-cover rounded-xl" />
                <div className="text-xs text-ink-muted truncate">{r.name}</div>
                <div className="text-xs tabular text-ink-dim">{(r.size / 1024).toFixed(0)} KB</div>
                <button className="btn-ghost w-full text-xs" onClick={() => saveAs(r.blob, r.name)}>ดาวน์โหลด</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
