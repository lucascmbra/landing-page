"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

type OutlineMarqueeProps = {
  sectionRef: React.RefObject<HTMLElement | null>
  imageRef: React.RefObject<HTMLImageElement | null>
  topText: string
  bottomText: string
  repeat?: number
}

const buildRepeatedItems = (text: string, count: number) =>
  Array.from({ length: count }, (_, index) => ({
    id: `${text}-${index}`,
    text,
  }))

export default function OutlineMarquee({
  sectionRef,
  imageRef,
  topText,
  bottomText,
  repeat = 4,
}: OutlineMarqueeProps) {
  const topItemRef = useRef<HTMLSpanElement | null>(null)
  const bottomItemRef = useRef<HTMLSpanElement | null>(null)

  const [outlineOffset, setOutlineOffset] = useState(0)
  const [topCycleWidth, setTopCycleWidth] = useState(0)
  const [bottomCycleWidth, setBottomCycleWidth] = useState(0)
  const [imageHeight, setImageHeight] = useState(0)

  const topItems = useMemo(
    () => buildRepeatedItems(topText, repeat),
    [topText, repeat],
  )

  const bottomItems = useMemo(
    () => buildRepeatedItems(bottomText, repeat),
    [bottomText, repeat],
  )

  useLayoutEffect(() => {
    const measureTrackWidths = () => {
      setTopCycleWidth(topItemRef.current?.offsetWidth ?? 0)
      setBottomCycleWidth(bottomItemRef.current?.offsetWidth ?? 0)
    }

    measureTrackWidths()
    window.addEventListener("resize", measureTrackWidths)

    return () => window.removeEventListener("resize", measureTrackWidths)
  }, [])

  useLayoutEffect(() => {
    const imageElement = imageRef.current
    if (!imageElement) return

    const updateImageHeight = () => {
      const nextHeight = imageElement.getBoundingClientRect().height
      setImageHeight(nextHeight)
    }

    updateImageHeight()

    const resizeObserver = new ResizeObserver(() => {
      updateImageHeight()
    })

    resizeObserver.observe(imageElement)

    if (!imageElement.complete) {
      imageElement.addEventListener("load", updateImageHeight)
    }

    return () => {
      resizeObserver.disconnect()
      imageElement.removeEventListener("load", updateImageHeight)
    }
  }, [imageRef])

  useEffect(() => {
    const handleScroll = () => {
      const sectionElement = sectionRef.current
      if (!sectionElement) return

      const rect = sectionElement.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const start = viewportHeight
      const end = -rect.height
      const progress = (start - rect.top) / (start - end)
      const clampedProgress = Math.max(0, Math.min(progress, 1))

      setOutlineOffset(clampedProgress * 32)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionRef])

  const topTranslate =
    topCycleWidth > 0 ? (outlineOffset * 20) % topCycleWidth : 0

  const bottomTranslate =
    bottomCycleWidth > 0 ? (outlineOffset * 20) % bottomCycleWidth : 0

  return (
    <div
      className="marquee-outline"
      aria-hidden="true"
      style={{ top: `${imageHeight}px` }}
    >
      <div className="marquee-outline__row--top marquee-outline__row">
        <div
          className="marquee-outline__track"
          style={{ transform: `translate3d(-${topTranslate}px, 0, 0)` }}
        >
          {topItems.map(({ id, text }, index) => (
            <span
              key={id}
              ref={index === 0 ? topItemRef : null}
              className="marquee-outline__item"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="marquee-outline__row--bottom marquee-outline__row">
        <div
          className="marquee-outline__track"
          style={{ transform: `translate3d(${bottomTranslate}px, 0, 0)` }}
        >
          {bottomItems.map(({ id, text }, index) => (
            <span
              key={id}
              ref={index === 0 ? bottomItemRef : null}
              className="marquee-outline__item"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
