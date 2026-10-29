import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import ToolLayout from '../components/ToolLayout.jsx'
import Dropzone from '../components/Dropzone.jsx'

export default function PdfMerge() {
  const [files, setFiles] = useState([])
  const [counts, setCounts] = useState([])
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState(null)
  const [total, setTotal] = useState(0)

  const load = async (list) => {
    const c = []
    for (const f of list) {
      try {
        const d = await PDFDocument.load(await f.arrayBuffer())
        c.push(d.getPageCount())
      } catch { c.push(0) }
    }
    setCounts(c)
  }

  const onFiles = (list) => { setFiles(list); load(list); setErr(null); setTotal(0) }
  const remove = (i) => { const f = files.filter((_, x) => x !== i); setFiles(f); load(f) }
  const move = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= files.length) return
    const f = [...files]; [f[i], f[j]] = [f[j], f[i]]; setFiles(f); load(f)
  }

  const run = async () => {
    if (files.length < 2) { setErr('ต้องมีอย่างน้อย 2 ไฟล์'); return }
    setBusy(true); setErr(null)
    try {
      const merged = await PDFDocument.create()
      for (const f of files) {
        const d = await PDFDocument.load(await f.arrayBuffer())
        const pages = await merged.copyPages(d, d.getPageIndices())
        pages.forEach((p) => merged.addPage(p))
      }
      const bytes = await merged.save()
      saveAs(new Blob([bytes], { type: 'application/pdf' }), 'merged.pdf')
      setTotal(merged.getPageCount())
    } catch (e) { setErr(e.message || 'ไฟล์ PDF เข้ารหัสหรือเสียหาย') }
    finally { setBusy(false) }
  }

  return (
    <ToolLayout title="PDF Merge" description="รวมไฟล์ PDF หลายไฟล์">
      <Dropzone accept="application/pdf" multiple onFiles={onFiles} hint="PDF · หลายไฟล์" />
      {files.length > 0 && (
        <div className="card space-y-3">
          {files.map((f, i) => (
            <div key={f.name + i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-alt">
              <span className="tabular text-ink-dim w-6">{i + 1}</span>
              <span className="flex-1 text-sm text-ink truncate">{f.name}</span>
              <span className="text-xs text-ink-muted tabular">{counts[i] ?? 0} หน้า</span>
              <button className="btn-ghost px-2" onClick={() => move(i, -1)}>↑</button>
              <button className="btn-ghost px-2" onClick={() => move(i, 1)}>↓</button>
              <button className="btn-ghost px-2" onClick={() => remove(i)}><i className="fa-solid fa-xmark" /></button>
            </div>
          ))}
          <button className="btn-primary w-full" disabled={busy || files.length < 2} onClick={run}>{busy ? 'กำลังรวม...' : 'รวมไฟล์'}</button>
          {total > 0 && <div className="text-sm text-success tabular">รวมเสร็จ · {total} หน้า</div>}
          {err && <div className="text-danger text-sm">{err}</div>}
        </div>
      )}
    </ToolLayout>
  )
}
