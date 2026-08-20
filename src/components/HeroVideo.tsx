import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { asset } from '../lib/asset'
import { prefersReducedMotion } from '../lib/reducedMotion'

const SRC = '/videos/video-colhedeira.mp4'
const POSTER = '/videos/video-colhedeira-poster.webp'

type NetworkInfo = { saveData?: boolean; effectiveType?: string }

/** Modo economia de dados ou 2G: segura o vídeo e deixa só o poster. */
function holdBack() {
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection
  if (!conn) return false
  return Boolean(conn.saveData) || /2g$/.test(conn.effectiveType ?? '')
}

/**
 * Vídeo do hero.
 *
 * O arquivo tem ~1,6 MB e é decorativo, então ele NÃO entra no caminho
 * crítico: o `<video>` nasce sem `src` (só com o poster de 30 KB, que é o
 * que o navegador pinta como LCP) e a fonte só é atribuída depois do evento
 * `load` da página. Assim o site abre na mesma velocidade de antes e o vídeo
 * chega logo em seguida, sem recompressão nenhuma.
 */
export function HeroVideo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [manual, setManual] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion() || holdBack()) {
      setManual(true)
      return
    }

    let timer: number
    const start = () => {
      timer = window.setTimeout(() => setSrc(asset(SRC)), 60)
    }

    if (document.readyState === 'complete') {
      start()
    } else {
      window.addEventListener('load', start, { once: true })
    }
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', start)
    }
  }, [])

  // autoplay explícito: `autoPlay` no JSX dispararia antes de existir `src`
  useEffect(() => {
    const el = ref.current
    if (!el || !src) return
    const play = () => void el.play().catch(() => undefined)
    el.addEventListener('loadeddata', play, { once: true })
    el.load()
    return () => el.removeEventListener('loadeddata', play)
  }, [src])

  return (
    <div className={`relative size-full ${className}`}>
      <video
        ref={ref}
        src={src ?? undefined}
        poster={asset(POSTER)}
        preload="none"
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label="Plataforma Draper com módulo agressivo colhendo em campo"
        className="size-full object-cover"
      />

      {manual ? (
        <button
          type="button"
          onClick={() => {
            setManual(false)
            setSrc(asset(SRC))
          }}
          className="absolute inset-0 grid cursor-pointer place-items-center bg-ink-950/20 transition-colors duration-200 hover:bg-ink-950/35"
        >
          <span className="grid size-16 place-items-center rounded-full bg-gold-400/95 text-steel-100 shadow-[0_10px_30px_-10px_rgba(16,21,27,0.7)]">
            <Play className="size-6 translate-x-0.5 fill-current" aria-hidden="true" />
          </span>
          <span className="sr-only">Reproduzir o vídeo da plataforma em campo</span>
        </button>
      ) : null}
    </div>
  )
}
