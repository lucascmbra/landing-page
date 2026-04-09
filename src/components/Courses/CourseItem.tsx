import type { CSSProperties } from "react"
import type { Course } from "./courses.types"

type CourseItemProps = {
  course: Course
  style?: CSSProperties
}

export default function CourseItem({ course, style }: CourseItemProps) {
  return (
    <li className="course-item" style={style}>
      <article className="course-item__content">
        <h3 className="course-item__title">{course.name}</h3>

        <p className="course-item__modalities">
          {course.modalities.map((modality) => modality.name).join(" • ")}
        </p>
      </article>
    </li>
  )
}
