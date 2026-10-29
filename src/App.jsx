import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

function P({ title }) { return <div className="max-w-3xl mx-auto p-8 text-muted">{title} — coming soon</div> }

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/image/compress" replace />} />
              <Route path="/image/compress" element={<P title="Image Compressor" />} />
              <Route path="/image/convert" element={<P title="Image Converter" />} />
              <Route path="/pdf/merge" element={<P title="PDF Merge" />} />
              <Route path="/pdf/split" element={<P title="PDF Split" />} />
              <Route path="/util/qr" element={<P title="QR Generator" />} />
              <Route path="/util/json" element={<P title="JSON Formatter" />} />
              <Route path="/util/hash" element={<P title="Hash Tool" />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
