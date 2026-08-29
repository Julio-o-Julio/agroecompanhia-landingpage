import { useEffect, useRef } from 'react'
import { CLIENTS, SHOW_SOCIAL_PROOF, STATS } from '../data/site'
import { prefersReducedMotion } from '../lib/reducedMotion'
import { useNearViewport } from '../lib/useNearViewport'
import { Reveal } from './ui/Reveal'

/* ------------------------------------------------------------------ *
 * Contadores animados com GSAP + ScrollTrigger
 * ------------------------------------------------------------------ */
function Counters() {
  const root = useRef<HTMLDListElement>(null)
  const near = useNearViewport(root)

  useEffect(() => {
    if (!near) return

    const nodes = root.current?.querySelectorAll<HTMLElement>('[data-count]')
    if (!nodes) return

    // quem pediu menos movimento vê o número final direto — e não baixa o GSAP
    if (prefersReducedMotion()) {
      nodes.forEach((n) => (n.textContent = Number(n.dataset.count ?? 0).toLocaleString('pt-BR')))
      return
    }

    let ctx: { revert: () => void } | undefined
    let cancelled = false

    // GSAP entra em chunk separado e só baixa quando a seção se aproxima
    import('../lib/gsap').then(({ gsap }) => {
      if (cancelled || !root.current) return

      ctx = gsap.context(() => {
        nodes.forEach((node) => {
          const target = Number(node.dataset.count ?? 0)
          const obj = { value: 0 }
          gsap.to(obj, {
            value: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: node, start: 'top 88%', once: true },
            onUpdate: () => {
              node.textContent = Math.round(obj.value).toLocaleString('pt-BR')
            },
          })
        })
      }, root)
    })

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [near])

  return (
    <dl
      ref={root}
      className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink-700 pt-10 lg:grid-cols-4"
    >
      {STATS.map((stat) => (
        <div key={stat.label}>
          <dd className="font-display text-[clamp(2.2rem,5vw,3.2rem)] leading-none font-extrabold text-steel-100 tabular-nums">
            <span data-count={stat.value}>0</span>
            <span className="text-gold-700">{stat.suffix}</span>
          </dd>
          <dt className="mt-2 text-sm font-medium text-steel-200">{stat.label}</dt>
          <p className="mt-0.5 text-xs text-steel-400">{stat.hint}</p>
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------------ *
 * Marquee de clientes (CSS puro — sem custo de JS)
 * ⚠️ PLACEHOLDER: trocar por logos reais autorizadas pelos clientes.
 * ------------------------------------------------------------------ */
function ClientLogo({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

  return (
    <li className="flex shrink-0 items-center gap-3 px-7">
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-md border border-ink-600 font-display text-sm font-bold text-steel-400"
      >
        {initials}
      </span>
      <span className="font-display text-base font-semibold whitespace-nowrap text-steel-400 transition-colors duration-300 hover:text-steel-200">
        {name}
      </span>
    </li>
  )
}

export function TrustBar() {
  return (
    <section aria-label="Números e clientes" className="bg-ink-950 py-16 md:py-20">
      {/* nomes de clientes ainda fictícios: display:none até virem os reais autorizados */}
      <div className={`container-page ${SHOW_SOCIAL_PROOF ? '' : 'hidden'}`}>
        <Reveal>
          <p className="text-center text-xs tracking-[0.25em] text-steel-400 uppercase">
            Quem já colhe com a gente
          </p>
        </Reveal>
      </div>

      <div
        className={`group relative mt-8 mask-x-from-85% mask-x-to-100% overflow-hidden ${
          SHOW_SOCIAL_PROOF ? '' : 'hidden'
        }`}
        aria-label="Clientes atendidos"
      >
        <ul className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]">
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <ClientLogo key={`${name}-${i}`} name={name} />
          ))}
        </ul>
      </div>

      <div className={`container-page ${SHOW_SOCIAL_PROOF ? 'mt-16' : ''}`}>
        <Counters />
      </div>
    </section>
  )
}
