import { useState } from 'react'
import imageCompression from 'browser-image-compression'
import { saveAs } from 'file-saver'
import ToolLayout from '../components/ToolLayout.jsx'
import { useToast } from '../components/Toast.jsx'
import Dropzone from '../components/Dropzone.jsx'

export default function ImageCompressor() {
  const toast = useToast()
  const [file, setFile] = useState(null)
  const [quality, setQuality] = useState(0.7)
  const [max, setMax] = useState(1920)
  const [busy, setBusy] = useState(false)
  const [out, setOut] = useState(null)

  const run = async () => {
    if (!file) return
    setBusy(true)
    try { const r = await imageCompression(file, { initialQuality: quality, maxWidthOrHeight: max, useWebWorker: true }); setOut(r); toast.success('บีบอัดสำเร็จ!') }
    catch (e) { toast.error(e.message) }
    finally { setBusy(false) }
  }
  const reset = () => { setFile(null); setOut(null) }
  const save = () => { if (out) saveAs(out, file.name) }
  const pct = out ? Math.round((1 - out.size / file.size) * 100) : 0

  const right = (
    <div className="space-y-4">
      <div className="card p-5 space-y-3">
        <h3 className="font-semibold text-ink">เกี่ยวกับเครื่องมือนี้</h3>
        <ul className="space-y-2 text-sm text-ink-muted">
          <li className="flex gap-2"><i className="fa-solid fa-check text-success mt-0.5" /> 100% ทำงานในเครื่อง</li>
          <li className="flex gap-2"><i className="fa-solid fa-shield-halved text-accent mt-0.5" /> ไม่มีการอัปโหลด</li>
          <li className="flex gap-2"><i className="fa-solid fa-bolt text-pink mt-0.5" /> ประมวลผลเร็ว</li>
        </ul>
      </div>
      <div className="card p-5 space-y-2">
        <h3 className="font-semibold text-ink text-sm">เครื่องมือที่เกี่ยวข้อง</h3>
        <a href="/image/convert" className="block text-sm text-ink-muted hover:text-accent">แปลงรูปภาพ →</a>
      </div>
    </div>
  )

  return (
    <ToolLayout title="Image Compressor" description="บีบอัดรูปภาพในเบราว์เซอร์" right={right}>
      {!file && <Dropzone accept="image/*" onFiles={(f) => setFile(f[0])} hint="PNG · JPG · WebP" />}
      {file && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-ink-muted truncate">{file.name}</span>
            <button className="btn-ghost" onClick={reset}>เปลี่ยน</button>
          </div>
          <div>
            <label className="text-xs text-dim">คุณภาพ {quality.toFixed(2)}</label>
            <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="text-xs text-dim">Max width {max}px</label>
            <input type="range" min="320" max="4096" step="1" value={max} onChange={(e) => setMax(+e.target.value)} className="w-full" />
          </div>
          <button className="btn-primary w-full" disabled={busy} onClick={run}>{busy ? 'กำลังบีบอัด...' : 'เริ่มบีบอัด'}</button>
          {out && (
            <div className="text-sm tabular flex items-center gap-3">
              <span>{(file.size / 1024).toFixed(0)} KB → {(out.size / 1024).toFixed(0)} KB · ลดได้ {pct}%</span>
              <button className="btn-ghost" onClick={save}>ดาวน์โหลด</button>
            </div>
          )}

        </div>
      )}
      {!out && (
        <div className="card border-dashed grid place-items-center min-h-[160px] text-ink-dim">
          <div className="text-center space-y-2">
            <i className="fa-solid fa-image text-3xl" />
            <p className="text-sm">ผลลัพธ์จะแสดงที่นี่</p>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
