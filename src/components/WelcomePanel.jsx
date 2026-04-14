export default function WelcomePanel({ course, week }) {
  const lectureCount = week.lectures.length
  const assignmentCount = week.assignments.length

  return (
    <section className="welcome-panel">
      <div className="welcome-copy">
        <p className="eyebrow">{course.title} Workspace</p>
        <h1>Build, organize, and grow your weekly React portfolio.</h1>
        <p>
          This starter uses a course-first structure with weekly folders, lecture topics,
          assignments, and placeholders for code/examples you will add later.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-label">Current Week</span>
            <strong>{week.label}</strong>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-label">Lectures</span>
            <strong>{lectureCount}</strong>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-label">Assignments</span>
            <strong>{assignmentCount}</strong>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="stack-cube cube-top">React</div>
        <div className="stack-cube cube-bottom">Course Lab</div>
      </div>
    </section>
  )
}
