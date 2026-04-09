"use client"

import { useEffect, useRef, useState } from "react"
import Marquee from "./Marquee"
import OutlineMarquee from "./Marquee/Outline"

const MARQUEE_TOP_TEXT = "CURSOS E IMERSÕES. UMA NOVA CULTURA DE MERCADO."
const MARQUEE_BOTTOM_TEXT =
  "TECNOLOGIA, INOVAÇÃO E NEGÓCIOS. PRESENTE E FUTURO."

const OUTLINE_TOP_TEXT = "skills • conhecimento • "
const OUTLINE_BOTTOM_TEXT = "muito além dos tutoriais • "

const LG_BREAKPOINT = 1024

export default function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const [isImageVisible, setIsImageVisible] = useState(false)
  const [showDesktopMedia, setShowDesktopMedia] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`)

    const updateViewport = (event?: MediaQueryListEvent) => {
      setShowDesktopMedia(event ? event.matches : mediaQuery.matches)
    }

    updateViewport()
    mediaQuery.addEventListener("change", updateViewport)

    return () => {
      mediaQuery.removeEventListener("change", updateViewport)
    }
  }, [])

  useEffect(() => {
    if (!showDesktopMedia) return

    const imageElement = imageRef.current
    if (!imageElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(imageElement)

    return () => observer.disconnect()
  }, [showDesktopMedia])

  return (
    <section className="intro" ref={sectionRef}>
      <div className="marquee">
        <Marquee text={MARQUEE_TOP_TEXT} direction="ltr" />
        <Marquee text={MARQUEE_BOTTOM_TEXT} direction="rtl" />
      </div>

      {showDesktopMedia && (
        <div className="intro__media">
          <div className="container hero">
            <div className="intro__media-frame">
              <img
                ref={imageRef}
                src="/assets/img/background/intro.png"
                alt="Ambiente FIAP"
                className="intro__image"
                width={1495}
                height={804}
              />

              <span
                className={`intro__media-reveal ${
                  isImageVisible ? "intro__media-reveal--visible" : ""
                }`}
                aria-hidden="true"
              />
            </div>
          </div>

          <OutlineMarquee
            sectionRef={sectionRef}
            imageRef={imageRef}
            topText={OUTLINE_TOP_TEXT}
            bottomText={OUTLINE_BOTTOM_TEXT}
          />
        </div>
      )}
    </section>
  )
}
