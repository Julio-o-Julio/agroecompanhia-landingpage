import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from '../lib/motion'
import { Plus } from 'lucide-react'
import { FAQ } from '../data/site'
import { Reveal } from './ui/Reveal'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <section id="faq" className="scroll-mt-24 bg-ink-900 py-20 md:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
            Dúvidas frequentes
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3rem)] font-extrabold">
            Perguntou, a gente responde.
          </h2>
          <p className="mt-5 text-steel-300">
            Se a sua dúvida não estiver aqui, é só chamar no WhatsApp. Respondemos inclusive em
            plena colheita.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="divide-y divide-ink-700 border-y border-ink-700">
            {FAQ.map((item, i) => {
              const isOpen = open === i
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-gold-700"
                    >
                      <span className="font-display text-lg font-bold text-steel-100">
                        {item.q}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-ink-600 text-gold-700"
                      >
                        <Plus className="size-4" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        key="panel"
                        initial={reduced ? undefined : { height: 0, opacity: 0 }}
                        animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pr-12 pb-6 text-steel-300">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
