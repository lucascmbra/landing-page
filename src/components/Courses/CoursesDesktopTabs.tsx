import type { CSSProperties } from "react"
import CourseItem from "./CourseItem"
import { EXIT_STAGGER } from "./courses.data"
import type { Course } from "./courses.types"

type CoursesDesktopTabsProps = {
  displayCategory: string
  isTransitioning: boolean
  displayedCourses: Course[]
}

export default function CoursesDesktopTabs({
  displayCategory,
  isTransitioning,
  displayedCourses,
}: CoursesDesktopTabsProps) {
  return (
    <div className="courses-panel">
      <p
        className={`courses-panel__category ${
          isTransitioning ? "courses-panel__category--leaving" : ""
        }`}
      >
        {displayCategory}
      </p>

      <ul
        className={`courses-list ${
          isTransitioning ? "courses-list--leaving" : "courses-list--entering"
        }`}
      >
        {displayedCourses.map((course, index) => (
          <CourseItem
            key={`${displayCategory}-${course.name}`}
            course={course}
            style={
              {
                "--course-delay": `${index * EXIT_STAGGER + 120}ms`,
              } as CSSProperties
            }
          />
        ))}
      </ul>
    </div>
  )
}
