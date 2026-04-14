export default function SectionBlock({ title, children, emptyMessage }) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : !!children

  return (
    <section className="section-block">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      {hasChildren ? children : <div className="empty-state">{emptyMessage}</div>}
    </section>
  )
}
