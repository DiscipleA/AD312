export default function TopicCard({ item, onClick, clickable = false }) {
  const Tag = clickable ? 'button' : 'article'

  return (
    <Tag
      className={clickable ? 'topic-card topic-card-clickable' : 'topic-card'}
      onClick={clickable ? onClick : undefined}
      type={clickable ? 'button' : undefined}
    >
      <div className="topic-card-header">
        <span className={item.type === 'assignment' ? 'topic-type assignment' : 'topic-type lecture'}>
          {item.type}
        </span>
        <span className={item.status === 'ready' ? 'ready-dot' : 'empty-dot'} />
      </div>

      <h3>{item.title}</h3>
      <p>{item.summary}</p>

      {clickable ? (
        <div className="topic-card-action">
          <span>{item.type === 'assignment' ? 'Open assignment' : 'Open lecture'}</span>
          <span className="topic-card-arrow">→</span>
        </div>
      ) : null}
    </Tag>
  )
}
