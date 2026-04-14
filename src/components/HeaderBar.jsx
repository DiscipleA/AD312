export default function HeaderBar({ course, week, theme, onToggleTheme }) {
  const nextTheme = theme === 'dark' ? 'Light' : 'Dark'

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{course.title}</p>
        <h2>{course.subtitle}</h2>
      </div>

      <div className="topbar-right">
        <button className="theme-toggle-button" onClick={onToggleTheme} type="button">
          {theme === 'dark' ? '🌙' : '☀️'} Switch to {nextTheme} Mode
        </button>

        <span className={course.status === 'Active' ? 'status-pill online' : 'status-pill planned'}>
          {course.status}
        </span>
        <span className="week-pill">{week.label}</span>
      </div>
    </header>
  )
}
