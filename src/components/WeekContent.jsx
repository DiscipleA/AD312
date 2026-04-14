function isLectureTwoItem(week, section, item) {
  return (
    week.id === 'week01' &&
    section.title === "React's State as a Snapshot" &&
    item === "Lecture: React's State as a Snapshot"
  )
}

export default function WeekContent({ week, activeCourseId, onOpenLecture }) {
  return (
    <section className="content-panel">
      <div className="panel-header">
        <h3>{week.label}</h3>
        <span className="panel-badge">Structured from screenshot data</span>
      </div>

      <div className="section-grid">
        {week.sections.map((section) => (
          <article className="info-card" key={section.title}>
            <h4>{section.title}</h4>

            <ul className="week-item-list">
              {section.items.map((item) => {
                const isLectureTwo =
                  activeCourseId === 'ad312' && isLectureTwoItem(week, section, item)

                return (
                  <li key={item} className={isLectureTwo ? 'week-item-with-action' : ''}>
                    <div className="week-item-copy">{item}</div>

                    {isLectureTwo ? (
                      <button
                        className="lecture-open-button"
                        onClick={() =>
                          onOpenLecture({
                            courseId: 'ad312',
                            weekId: 'week01',
                            lectureId: 'react-state-as-a-snapshot',
                            title: "React's State as a Snapshot",
                          })
                        }
                      >
                        Open Lecture
                      </button>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
