export default function Sidebar({
  courses,
  selectedCourse,
  onSelectCourse,
  selectedWeekId,
  onSelectWeek,
}) {
  const activeCourse = courses.find((course) => course.id === selectedCourse)

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-mark">🐸</div>
          <div>
            <h1>Course Lab</h1>
            <p>React + portfolio workspace</p>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Courses</div>
        <div className="course-switcher">
          {courses.map((course) => (
            <button
              key={course.id}
              className={course.id === selectedCourse ? 'nav-button active' : 'nav-button'}
              onClick={() => onSelectCourse(course.id)}
            >
              <span>{course.title}</span>
              <span className={course.status === 'Active' ? 'status-pill online' : 'status-pill planned'}>
                {course.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Weeks</div>
        <div className="week-list">
          {activeCourse.weeks.map((week) => (
            <button
              key={week.id}
              className={week.id === selectedWeekId ? 'week-button active' : 'week-button'}
              onClick={() => onSelectWeek(week.id)}
            >
              {week.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
