"use client"

import { useEffect, useState } from "react"
import { FAQ_ITEMS } from "./faq.data"

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)")

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches)
      setActiveIndex(null)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  const handleMouseEnter = (index: number) => {
    if (!isDesktop) return
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    if (!isDesktop) return
    setActiveIndex(null)
  }

  const handleClick = (index: number) => {
    if (isDesktop) return
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="faq">
      <div className="container">
        <header className="faq__header">
          <div className="section-title">
            <h2 className="section-title__title">FAQ</h2>
            <p className="section-title__subtitle">Dúvidas Frequentes</p>
          </div>
        </header>

        <ul className="faq__list">
          {FAQ_ITEMS.map(({ question, answer }, index) => {
            const isActive = activeIndex === index

            return (
              <li
                key={question}
                className={`faq-card ${isActive ? "faq-card--active" : ""}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <article className="faq-card__content">
                  <button
                    type="button"
                    className="faq-card__trigger"
                    onClick={() => handleClick(index)}
                    aria-expanded={isActive}
                  >
                    <span className="faq-card__question">{question}</span>
                  </button>

                  <div className="faq-card__answer-wrapper">
                    <p className="faq-card__answer">{answer}</p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
