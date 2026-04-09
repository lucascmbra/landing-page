import { useEffect, useRef } from "react"
import CourseItem from "./CourseItem"
import type { Course } from "./courses.types"

type CoursesByCategory = Record<string, Course[]>

type CoursesMobileAccordionProps = {
  categories: string[]
  openedCategory: string
  coursesByCategory: CoursesByCategory
  onToggleCategory: (category: string) => void
}

export default function CoursesMobileAccordion({
  categories,
  openedCategory,
  coursesByCategory,
  onToggleCategory,
}: CoursesMobileAccordionProps) {
  const itemRefs = useRef<Record<string, HTMLElement | null>>({})
  const hasMountedRef = useRef(false)

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    if (!openedCategory) return

    const sectionElement = itemRefs.current[openedCategory]

    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [openedCategory])

  return (
    <div className="courses-accordion" aria-label="Categorias de cursos">
      {categories.map((category) => {
        const isOpen = openedCategory === category
        const categoryCourses = coursesByCategory[category] ?? []

        return (
          <section
            key={category}
            ref={(sectionElement) => {
              itemRefs.current[category] = sectionElement
            }}
            className={`courses-accordion__item ${
              isOpen ? "courses-accordion__item--open" : ""
            }`}
          >
            <button
              type="button"
              className="courses-accordion__trigger"
              onClick={() => onToggleCategory(category)}
              aria-expanded={isOpen}
              aria-controls={`courses-accordion-panel-${category}`}
            >
              <span className="courses-accordion__title">{category}</span>

              <span
                className={`courses-accordion__icon ${
                  isOpen
                    ? "courses-accordion__icon--open"
                    : "courses-accordion__icon--closed"
                }`}
                aria-hidden="true"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <div
              id={`courses-accordion-panel-${category}`}
              className="courses-accordion__content"
              hidden={!isOpen}
            >
              <ul className="courses-list--mobile courses-list">
                {categoryCourses.map((course) => (
                  <CourseItem
                    key={`${category}-${course.name}`}
                    course={course}
                  />
                ))}
              </ul>
            </div>
          </section>
        )
      })}
    </div>
  )
}
