export default function ToolLayout({ title, description, children }) {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-muted mt-1 text-sm">{description}</p>}
      </div>
      {children}
    </div>
  )
}
