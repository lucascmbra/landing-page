"use client"

import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Intro from "@/components/Intro"
import WaterSequence from "@/components/WaterSequence"
import Courses from "@/components/Courses"
import Faq from "@/components/Faq"
import { useEffect, useState } from "react"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <Navbar />
      <Header />
      <Intro />
      {!isMobile && <WaterSequence />}
      <Courses />
      <Faq />
    </>
  )
}
