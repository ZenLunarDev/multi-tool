import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ImageCompressor from './tools/ImageCompressor.jsx'
import ImageConverter from './tools/ImageConverter.jsx'
import PdfMerge from './tools/PdfMerge.jsx'
import QrGenerator from './tools/QrGenerator.jsx'
import JsonFormatter from './tools/JsonFormatter.jsx'
import HashTool from './tools/HashTool.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image/compress" element={<ImageCompressor />} />
          <Route path="/image/convert" element={<ImageConverter />} />
          <Route path="/pdf/merge" element={<PdfMerge />} />
          <Route path="/pdf/split" element={<div className="max-w-3xl mx-auto p-8 text-ink-muted">PDF Split — coming soon</div>} />
          <Route path="/util/qr" element={<QrGenerator />} />
          <Route path="/util/json" element={<JsonFormatter />} />
          <Route path="/util/hash" element={<HashTool />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  )
}
