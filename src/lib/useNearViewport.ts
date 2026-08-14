import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

/**
 * Vira true quando o elemento se aproxima da viewport (padrão: 600px antes).
 * Usado para adiar o download do GSAP até ele fazer falta de verdade.
 */
export function useNearViewport(ref: RefObject<HTMLElement | null>, rootMargin = '600px') {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])

  return near
}
