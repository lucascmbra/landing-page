"use client"

import { useEffect, useMemo, useState } from "react"
import CoursesDesktopTabs from "./CoursesDesktopTabs"
import CoursesMobileAccordion from "./CoursesMobileAccordion"
import { BASE_EXIT_DURATION, COURSES, EXIT_STAGGER } from "./courses.data"
import type { Course } from "./courses.types"

type CoursesByCategory = Record<string, Course[]>

export default function Courses() {
  const categories = useMemo(
    () => [...new Set(COURSES.map((course) => course.category))],
    [],
  )

  const coursesByCategory = useMemo<CoursesByCategory>(() => {
    return categories.reduce<CoursesByCategory>((accumulator, category) => {
      accumulator[category] = COURSES.filter(
        (course) => course.category === category,
      )
      return accumulator
    }, {})
  }, [categories])

  const initialCategory = categories[0] ?? ""

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [displayCategory, setDisplayCategory] = useState(initialCategory)
  const [previousCategory, setPreviousCategory] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const displayedCourses: Course[] = coursesByCategory[displayCategory] ?? []

  const handleCategoryChange = (nextCategory: string) => {
    if (
      !nextCategory ||
      nextCategory === selectedCategory ||
      nextCategory === displayCategory ||
      isTransitioning
    ) {
      return
    }

    setIsTransitioning(true)
    setPreviousCategory(selectedCategory)

    const currentListLength = displayedCourses.length
    const totalExitDuration =
      currentListLength * EXIT_STAGGER + BASE_EXIT_DURATION

    window.setTimeout(() => {
      setDisplayCategory(nextCategory)
      setSelectedCategory(nextCategory)

      window.setTimeout(() => {
        setIsTransitioning(false)
      }, 80)
    }, totalExitDuration)
  }

  const handleMobileAccordion = (category: string) => {
    setSelectedCategory((currentCategory) => {
      const nextCategory = currentCategory === category ? "" : category

      if (nextCategory) {
        setDisplayCategory(nextCategory)
        setPreviousCategory(currentCategory || null)
      }

      return nextCategory
    })
  }

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setDisplayCategory(categories[0])
    }
  }, [selectedCategory, categories])

  return (
    <section className="courses">
      <div className="container">
        <header className="courses__header">
          <div className="section-title">
            <h2 className="section-title__title">Cursos</h2>
            <p className="section-title__subtitle">Cursos de Curta Duração</p>
          </div>

          <nav
            className="courses__categories"
            aria-label="Categorias de cursos"
          >
            <ul className="courses-tabs">
              {categories.map((category) => {
                const desktopActiveCategory =
                  selectedCategory || categories[0] || ""

                const isActive = desktopActiveCategory === category
                const isPrevious = previousCategory === category && !isActive

                return (
                  <li key={category} className="courses-tabs__item">
                    <button
                      type="button"
                      className={[
                        "courses-tabs__button",
                        isActive ? "courses-tabs__button--active" : "",
                        isPrevious ? "courses-tabs__button--previous" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => handleCategoryChange(category)}
                    >
                      <span className="courses-tabs__label">{category}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </header>

        <div className="courses__body">
          <CoursesDesktopTabs
            displayCategory={displayCategory}
            isTransitioning={isTransitioning}
            displayedCourses={displayedCourses}
          />

          <CoursesMobileAccordion
            categories={categories}
            openedCategory={selectedCategory}
            coursesByCategory={coursesByCategory}
            onToggleCategory={handleMobileAccordion}
          />
        </div>
      </div>
    </section>
  )
}
