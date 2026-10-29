import { useRef, useState } from 'react'

export default function Dropzone({ accept, multiple, onFiles }) {
  const input = useRef(null)
  const [drag, setDrag] = useState(false)
  const pick = () => input.current?.click()
  const handle = (files) => {
    if (files?.length) onFiles(Array.from(files))
  }
  return (
    <div
      onClick={pick}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files) }}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${drag ? 'border-accent bg-accent-soft' : 'border-border hover:border-muted'}`}
    >
      <p className="text-muted text-sm">ลากไฟล์มาวาง หรือคลิกเลือก</p>
      <input ref={input} type="file" accept={accept} multiple={multiple} hidden onChange={(e) => handle(e.target.files)} />
    </div>
  )
}
