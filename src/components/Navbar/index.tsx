"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [pageScrollProgress, setPageScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollState = () => {
      const currentScrollY = window.scrollY
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const nextScrollProgress =
        scrollableHeight > 0
          ? Math.min(currentScrollY / scrollableHeight, 1)
          : 0

      setHasScrolled(currentScrollY > 0)
      setPageScrollProgress(nextScrollProgress)
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateScrollState)
    }
  }, [])

  return (
    <nav className={`navbar ${hasScrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__content">
        <Image
          src="/assets/img/logo-fiap.svg"
          alt="Logo FIAP"
          className="navbar__logo"
          width={144}
          height={39}
          priority
        />
      </div>

      <span
        className="navbar__progress"
        style={{ transform: `scaleX(${pageScrollProgress})` }}
        aria-hidden="true"
      />
    </nav>
  )
}
