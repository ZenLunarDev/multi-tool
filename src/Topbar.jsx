import { useLocation } from 'react-router-dom'

const names = {
  '/image/compress': 'Image Compressor',
  '/image/convert': 'Image Converter',
  '/pdf/merge': 'PDF Merge',
  '/pdf/split': 'PDF Split',
  '/util/qr': 'QR Generator',
  '/util/json': 'JSON Formatter',
  '/util/hash': 'Hash Tool',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const title = names[pathname] ?? 'Multi-Tool'
  return (
    <header className="h-16 shrink-0 bg-panel border-b border-border flex items-center justify-between px-6">
      <h1 className="text-base font-semibold tracking-tight">{title}</h1>
      <span className="text-xs text-muted px-2 py-1 rounded-md border border-border bg-card">runs locally</span>
    </header>
  )
}
