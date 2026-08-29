import { motion, useReducedMotion, revealItem } from '../lib/motion'
import { Star } from 'lucide-react'
import { SHOW_SOCIAL_PROOF, TESTIMONIALS } from '../data/site'
import { Reveal, RevealGroup } from './ui/Reveal'

export function Testimonials() {
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="depoimentos-titulo"
      /* depoimentos ainda fictícios: seção com display:none até chegarem os reais */
      className={`bg-ink-950 py-20 md:py-28 ${SHOW_SOCIAL_PROOF ? '' : 'hidden'}`}
    >
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
            Quem já usa
          </p>
          <h2
            id="depoimentos-titulo"
            className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.3rem)] font-extrabold"
          >
            O teste que vale é o da safra.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              variants={reduced ? undefined : revealItem}
              className="flex h-full flex-col rounded-2xl border border-ink-700 bg-ink-850 p-6 transition-colors duration-300 hover:border-gold-400/35"
            >
              <div className="flex gap-0.5" aria-label="Avaliação 5 de 5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-gold-500 text-gold-700" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1">
                <p className="font-display text-lg leading-snug font-semibold text-steel-100">
                  “{t.quote}”
                </p>
              </blockquote>

              <figcaption className="mt-6 border-t border-ink-700 pt-4">
                <p className="font-display text-base font-bold text-steel-100">{t.name}</p>
                <p className="text-sm text-steel-400">{t.role}</p>
                <p className="text-sm text-steel-400">{t.location}</p>
              </figcaption>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
