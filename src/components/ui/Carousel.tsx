import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { prefersReducedMotion } from '../../lib/reducedMotion'
import type { ProductImage } from '../../data/site'

const AUTOPLAY_MS = 5000

/** O quadro tem no máximo 36rem no desktop (coluna da grade de produtos). */
const SIZES = '(min-width: 1024px) 36rem, (min-width: 640px) 90vw, 100vw'

/**
 * Carrossel de fotos de produto.
 *
 * A pista é um contêiner com `scroll-snap`: o arraste no celular sai de graça
 * e as setas só chamam `scrollTo`. A posição do scroll é a única fonte de
 * verdade do slide atual — assim autoplay, setas, miniaturas e swipe nunca
 * discordam entre si.
 */
export function Carousel({ images, className = '' }: { images: ProductImage[]; className?: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const single = images.length < 2

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const el = track.current
      if (!el) return
      const next = ((i % images.length) + images.length) % images.length
      el.scrollTo({
        left: next * el.clientWidth,
        behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto',
      })
    },
    [images.length],
  )

  useEffect(() => {
    const el = track.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (single || paused || prefersReducedMotion()) return
    const id = window.setInterval(() => {
      const el = track.current
      if (!el || document.hidden) return
      goTo(Math.round(el.scrollLeft / el.clientWidth) + 1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [single, paused, goTo])

  return (
    <div
      className={className}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Fotos do produto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-ink-600 bg-ink-850">
        <div
          ref={track}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1) }
            if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1) }
          }}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="w-full shrink-0 snap-center"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${images.length}`}
            >
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes={SIZES}
                alt={img.alt}
                width={1152}
                height={864}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                className="aspect-3/2 w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-gold-400/25 ring-inset"
          aria-hidden="true"
        />

        {single ? null : (
          <>
            <Arrow side="left" onClick={() => goTo(index - 1)} />
            <Arrow side="right" onClick={() => goTo(index + 1)} />
            <p className="pointer-events-none absolute right-3 bottom-3 rounded-full border border-ink-600 bg-ink-850/85 px-2.5 py-1 text-xs font-semibold text-steel-200 tabular-nums backdrop-blur-sm">
              {index + 1}/{images.length}
            </p>
          </>
        )}
      </div>

      {single ? null : (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index}
                className={`block cursor-pointer overflow-hidden rounded-lg border-2 transition-colors duration-200 ${
                  i === index
                    ? 'border-gold-400'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.thumb}
                  alt=""
                  width={200}
                  height={150}
                  loading="lazy"
                  decoding="async"
                  className="aspect-3/2 w-16 object-cover sm:w-20"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Arrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Foto anterior' : 'Próxima foto'}
      className={`absolute top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-ink-600 bg-ink-850/85 text-steel-100 backdrop-blur-sm transition-colors duration-200 hover:border-gold-400/60 hover:text-gold-700 ${
        side === 'left' ? 'left-3' : 'right-3'
      }`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  )
}
