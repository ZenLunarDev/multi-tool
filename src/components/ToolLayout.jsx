export default function ToolLayout({ title, description, children, right }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink tracking-tight">{title}</h1>
        {description && <p className="text-ink-muted mt-1 text-sm">{description}</p>}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
        <div className="space-y-6">{children}</div>
        {right && <aside className="space-y-6 lg:sticky lg:top-24 self-start">{right}</aside>}
      </div>
    </div>
  )
}
