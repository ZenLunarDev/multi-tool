import { useRef, useState, useEffect } from 'react'

export default function Dropzone({ accept, multiple, onFiles, hint }) {
  const input = useRef(null)
  const [drag, setDrag] = useState(false)
  const pick = () => input.current?.click()
  const handle = (files) => { if (files?.length) onFiles(Array.from(files)) }

  useEffect(() => {
    const onPaste = (e) => {
      const f = e.clipboardData?.files
      if (!f?.length) return
      const img = Array.from(f).find((x) => x.type.startsWith('image/'))
      if (img) { e.preventDefault(); onFiles([img]) }
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [onFiles])

  return (
    <div
      onClick={pick}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files) }}
      className={`relative rounded-3xl p-14 text-center cursor-pointer bg-gradient-to-br from-surface to-surface-alt border-2 border-dashed border-border-strong transition-all duration-300 group ${drag ? 'border-accent bg-accent-soft/30 shadow-[var(--shadow-lift)]' : 'hover:border-accent hover:bg-accent-soft/30 hover:shadow-[var(--shadow-lift)]'}`}
    >
      <div className="mx-auto mb-5 w-20 h-20 rounded-3xl bg-accent/10 grid place-items-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        <i className="fa-solid fa-cloud-arrow-up text-3xl text-accent" />
      </div>
      <p className="text-lg font-semibold text-ink mb-1.5">
        ลากไฟล์มาวาง หรือ
        <span className="text-accent underline decoration-2 underline-offset-4 ml-1">คลิกเพื่อเลือก</span>
      </p>
      <p className="text-sm text-ink-muted">{hint ?? 'PNG · JPG · WebP'}</p>
      <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-dim">
        <i className="fa-solid fa-paste" /> หรือกด Ctrl+V เพื่อวาง
      </div>
      <input ref={input} type="file" accept={accept} multiple={multiple} hidden onChange={(e) => handle(e.target.files)} />
    </div>
  )
}
