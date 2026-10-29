import { Link } from 'react-router-dom'

const tools = [
  { to: '/image/compress', icon: 'fa-image', color: 'accent', title: 'บีบอัดรูปภาพ', desc: 'ลดขนาดโดยคงคุณภาพ', badge: 'ยอดนิยม' },
  { to: '/image/convert', icon: 'fa-arrow-right-arrow-left', color: 'pink', title: 'แปลงรูปภาพ', desc: 'WebP · JPG · PNG', badge: null },
  { to: '/pdf/merge', icon: 'fa-file-pdf', color: 'slate', title: 'รวม PDF', desc: 'รวมหลายไฟล์เป็นหนึ่ง', badge: null },
  { to: '/pdf/split', icon: 'fa-scissors', color: 'accent', title: 'แยก PDF', desc: 'แยกหน้าที่ต้องการ', badge: null },
  { to: '/util/qr', icon: 'fa-qrcode', color: 'pink', title: 'สร้าง QR Code', desc: 'ข้อความหรือลิงก์', badge: 'ใหม่' },
  { to: '/util/json', icon: 'fa-code', color: 'slate', title: 'จัดรูปแบบ JSON', desc: 'Pretty · Minify · Validate', badge: null },
  { to: '/util/hash', icon: 'fa-fingerprint', color: 'accent', title: 'Hash & Checksum', desc: 'SHA-1 · 256 · 512', badge: null },
]

const bg = { accent: 'bg-accent-soft', pink: 'bg-pink-soft', slate: 'bg-slate/10' }
const fg = { accent: 'text-accent', pink: 'text-pink', slate: 'text-slate' }

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <section className="rounded-3xl p-12 md:p-16 bg-gradient-to-br from-accent to-accent-hover text-white relative overflow-hidden min-h-[280px]">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-pink/20 blur-2xl" />
        <div className="relative max-w-xl space-y-5">
          <span className="pill bg-white/20 text-white">Browser-only tools</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">แปลงไฟล์ครบ จบในเบราว์เซอร์</h1>
          <p className="text-white/85 text-lg">ไม่มีการอัปโหลด · ทำงาน 100% ในเครื่องคุณ</p>
          <div className="flex gap-3 pt-2">
            <Link to="/image/compress" className="btn-ghost bg-white text-accent border-0 shadow-lg">เริ่มใช้งาน</Link>
            <a href="#tools" className="btn-ghost bg-white/10 text-white border-white/30">ดูทั้งหมด</a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          ['fa-bolt', 'ประมวลผลในเครื่อง', 'ไม่มีการอัปโหลดไฟล์'],
          ['fa-shield-halved', 'ปลอดภัย', 'ข้อมูลไม่ออกจากเบราว์เซอร์'],
          ['fa-gift', 'ฟรี', 'ไม่มีค่าใช้จ่าย ไม่มีลายน้ำ'],
        ].map(([icon, t, d]) => (
          <div key={t} className="card p-5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-soft grid place-items-center shrink-0">
              <i className={`fa-solid ${icon} text-accent`} />
            </div>
            <div>
              <div className="font-semibold text-ink text-sm">{t}</div>
              <div className="text-xs text-ink-muted">{d}</div>
            </div>
          </div>
        ))}
      </div>

      <section id="tools">
        <h2 className="text-xl font-bold text-ink mb-4">เครื่องมือทั้งหมด</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} className="group card p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:border-accent/30 relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-soft to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {t.badge && <span className="absolute top-4 right-4 pill text-[10px]">{t.badge}</span>}
              <div className={`relative w-12 h-12 rounded-2xl ${bg[t.color]} grid place-items-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`fa-solid ${t.icon} text-lg ${fg[t.color]} group-hover:text-white transition-colors`} />
              </div>
              <h3 className="relative font-semibold text-ink mb-1">{t.title}</h3>
              <p className="relative text-sm text-ink-muted flex-1">{t.desc}</p>
              <i className="fa-solid fa-arrow-right absolute bottom-6 right-6 text-ink-dim group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
