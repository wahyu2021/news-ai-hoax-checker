"use client"

import type React from "react"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
  delay?: number // in seconds
  className?: string
}

export function Appear({ children, delay = 0, className = "" }: Props) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 10)
    return () => clearTimeout(t)
  }, [])
  return (
    <div
      className={`${className} transition-all duration-700 will-change-transform ${
        on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
