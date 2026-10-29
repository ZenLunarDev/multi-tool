import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { saveAs } from 'file-saver'
import ToolLayout from '../components/ToolLayout.jsx'

export default function QrGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(512)
  const [ec, setEc] = useState('M')
  const [fg, setFg] = useState('#e6e8ee')
  const [bg, setBg] = useState('#161922')
  const [url, setUrl] = useState('')
  const [svg, setSvg] = useState('')

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!text.trim()) { setUrl(''); setSvg(''); return }
      try {
        const u = await QRCode.toDataURL(text, { width: size, errorCorrectionLevel: ec, color: { dark: fg, light: bg } })
        const s = await QRCode.toString(text, { type: 'svg', width: size, errorCorrectionLevel: ec, color: { dark: fg, light: bg } })
        setUrl(u); setSvg(s)
      } catch { setUrl(''); setSvg('') }
    }, 200)
    return () => clearTimeout(t)
  }, [text, size, ec, fg, bg])

  const dlPng = () => { if (url) saveAs(url, 'qr.png') }
  const dlSvg = () => { if (svg) saveAs(new Blob([svg], { type: 'image/svg+xml' }), 'qr.svg') }

  return (
    <ToolLayout title="QR Generator" description="สร้าง QR Code จากข้อความหรือลิงก์">
      <div className="card space-y-4">
        <input className="input" placeholder="ข้อความหรือ URL" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="flex flex-wrap gap-3">
          <div>
            <label className="text-xs text-dim block mb-1">ขนาด</label>
            <div className="flex gap-1">
              {[256, 512, 1024].map((s) => <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium ${size === s ? 'bg-accent text-white' : 'bg-surface-alt text-ink-muted'}`}>{s}</button>)}
            </div>
          </div>
          <div>
            <label className="text-xs text-dim block mb-1">Error correction</label>
            <div className="flex gap-1">
              {['L', 'M', 'Q', 'H'].map((e) => <button key={e} onClick={() => setEc(e)} className={`px-3 py-1.5 rounded-full text-xs font-medium ${ec === e ? 'bg-accent text-white' : 'bg-surface-alt text-ink-muted'}`}>{e}</button>)}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <label className="text-xs text-dim block mb-1">สีหน้า</label>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-12 h-10 rounded-lg border border-border" />
          </div>
          <div>
            <label className="text-xs text-dim block mb-1">สีพื้น</label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-12 h-10 rounded-lg border border-border" />
          </div>
        </div>
      </div>
      <div className="card grid place-items-center min-h-[240px]">
        {url ? (
          <div className="space-y-3 text-center">
            <img src={url} alt="qr" className="mx-auto rounded-xl" style={{ width: 200, height: 200 }} />
            <div className="flex gap-2 justify-center">
              <button className="btn-primary" onClick={dlPng}>PNG</button>
              <button className="btn-ghost" onClick={dlSvg}>SVG</button>
            </div>
          </div>
        ) : (
          <p className="text-ink-muted text-sm">พิมพ์ข้อความเพื่อสร้าง QR</p>
        )}
      </div>
    </ToolLayout>
  )
}
