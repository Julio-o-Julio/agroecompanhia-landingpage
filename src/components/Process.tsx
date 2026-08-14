import { useEffect, useRef } from 'react'
import { PROCESS } from '../data/site'
import { prefersReducedMotion } from '../lib/reducedMotion'
import { useNearViewport } from '../lib/useNearViewport'
import { Reveal } from './ui/Reveal'

/**
 * Seção "Do aço ao talhão".
 *
 * Animação assinatura em GSAP + ScrollTrigger: em telas ≥1024px a seção é
 * "pinada" e as 4 etapas correm na horizontal conforme o usuário rola, com
 * barra de progresso sincronizada. Abaixo disso — ou com prefers-reduced-motion —
 * vira uma timeline vertical normal, sem nenhum JS de animação.
 */
export function Process() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const near = useNearViewport(section, '900px')

  useEffect(() => {
    if (!near || prefersReducedMotion()) return
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    import('../lib/gsap').then(({ gsap }) => {
      if (cancelled || !section.current || !track.current) return

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
          const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', track.current!)
          const distance = () => track.current!.scrollWidth - window.innerWidth

          const tl = gsap.to(track.current, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section.current,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
              },
            },
          })

          // cada painel entra com leve fade + subida enquanto se aproxima do centro
          panels.forEach((panel, i) => {
            if (i === 0) return
            gsap.from(panel.querySelector('[data-panel-inner]'), {
              opacity: 0.15,
              y: 48,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tl,
                start: 'left 88%',
                end: 'left 45%',
                scrub: true,
              },
            })
          })
        })
      }, section)
    })

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [near])

  return (
    <section
      ref={section}
      aria-labelledby="processo-titulo"
      className="relative overflow-hidden bg-ink-950 py-20 lg:h-screen lg:py-0"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative flex h-full flex-col justify-center">
        <div className="container-page shrink-0 lg:pt-10">
          <Reveal className="max-w-2xl">
            <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
              Como funciona
            </p>
            <h2
              id="processo-titulo"
              className="mt-4 font-display text-[clamp(2rem,4.6vw,3.2rem)] font-extrabold"
            >
              Do aço ao talhão, em quatro passos
            </h2>
          </Reveal>

          {/* barra de progresso (só faz sentido no modo horizontal) */}
          <div className="mt-8 hidden h-[3px] w-full overflow-hidden rounded-full bg-ink-600 lg:block">
            <div
              ref={bar}
              className="h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
            />
          </div>
        </div>

        {/* trilho */}
        <div className="mt-10 lg:mt-0 lg:flex-1">
          <div
            ref={track}
            className="flex flex-col gap-6 lg:h-full lg:w-max lg:flex-row lg:gap-0 lg:will-change-transform"
          >
            {PROCESS.map((item, i) => (
              <div
                key={item.step}
                data-panel
                className="container-page lg:flex lg:w-screen lg:shrink-0 lg:items-center"
              >
                <div
                  data-panel-inner
                  className="relative rounded-2xl border border-ink-700 bg-ink-850/80 p-7 lg:max-w-2xl lg:border-0 lg:bg-transparent lg:p-0"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-none font-extrabold text-ink-500 lg:text-[11rem]"
                  >
                    {item.step}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold text-steel-100 lg:mt-4 lg:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-steel-300 lg:mt-6 lg:text-xl">{item.text}</p>

                  <p className="mt-6 hidden items-center gap-3 text-sm tracking-[0.2em] text-steel-400 uppercase lg:flex">
                    Etapa {i + 1} de {PROCESS.length}
                    <span className="h-px w-16 bg-gold-500/70" aria-hidden="true" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
