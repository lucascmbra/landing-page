"use client"

import { useEffect, useMemo, useRef, useState } from "react"

const TOTAL_FRAMES = 192
const LAST_FRAME = TOTAL_FRAMES - 1

const DEFAULT_START_OFFSET = 0
const DEFAULT_END_OFFSET = 500

type WaterSequenceProps = {
  startOffset?: number
  endOffset?: number
}

const getFrameSrc = (index: number) => {
  const padded = String(index).padStart(3, "0")
  return `/assets/img/motion/water/water_${padded}.jpg`
}

export default function WaterSequence({
  startOffset = DEFAULT_START_OFFSET,
  endOffset = DEFAULT_END_OFFSET,
}: WaterSequenceProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const startOffsetRef = useRef(startOffset)
  const endOffsetRef = useRef(endOffset)

  const [currentFrame, setCurrentFrame] = useState(0)

  const frameSources = useMemo(
    () =>
      Array.from({ length: TOTAL_FRAMES }, (_, index) => getFrameSrc(index)),
    [],
  )

  useEffect(() => {
    frameSources.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [frameSources])

  useEffect(() => {
    const updateFrame = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const start = viewportHeight - startOffsetRef.current
      const end = -rect.height + endOffsetRef.current
      const distance = start - end

      if (distance <= 0) return

      const rawProgress = (start - rect.top) / distance
      const clampedProgress = Math.max(0, Math.min(rawProgress, 1))
      const nextFrame = Math.round(clampedProgress * LAST_FRAME)

      setCurrentFrame((prevFrame) =>
        prevFrame === nextFrame ? prevFrame : nextFrame,
      )
    }

    const handleScroll = () => {
      if (rafRef.current) return

      rafRef.current = window.requestAnimationFrame(() => {
        updateFrame()
        rafRef.current = null
      })
    }

    const handleResize = () => {
      handleScroll()
    }

    updateFrame()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [startOffset, endOffset, frameSources])

  return (
    <section ref={sectionRef} className="water-sequence">
      <img
        className="water-sequence__image"
        src={frameSources[currentFrame]}
        alt=""
        aria-hidden="true"
      />
    </section>
  )
}
