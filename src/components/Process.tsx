import { MessageSquare, Factory, Truck, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion, revealItem } from '../lib/motion'
import { PROCESS } from '../data/site'
import { Reveal, RevealGroup } from './ui/Reveal'

const ICONS: Record<string, LucideIcon> = {
  chat: MessageSquare,
  factory: Factory,
  truck: Truck,
  wrench: Wrench,
}

/**
 * Seção "Do aço ao talhão".
 *
 * Timeline estática de 4 etapas: empilhada com fio vertical até lg e em quatro
 * colunas com fio horizontal a partir daí. Sem pin nem scroll horizontal — a
 * única animação é o fade/subida de entrada, que respeita prefers-reduced-motion.
 */
export function Process() {
  const reduced = useReducedMotion()

  return (
    <section
      id="processo"
      aria-labelledby="processo-titulo"
      className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-20 md:py-28"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container-page relative">
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
          <p className="mt-5 text-lg text-steel-300">
            Do primeiro contato no WhatsApp até a primeira colheita com o equipamento montado —
            com prazo combinado antes da safra, não durante.
          </p>
        </Reveal>

        <RevealGroup className="mt-14">
          <ol className="grid gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {PROCESS.map((item, i) => {
              const Icon = ICONS[item.icon]
              const last = i === PROCESS.length - 1

              return (
                <motion.li
                  key={item.step}
                  variants={reduced ? undefined : revealItem}
                  className="relative pl-20 lg:pl-0"
                >
                  {/* fio ligando as etapas: vertical na pilha, horizontal em 4 colunas */}
                  {!last && (
                    <span
                      aria-hidden="true"
                      className="absolute top-14 left-7 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold-400/45 to-ink-600 lg:top-7 lg:left-16 lg:h-px lg:w-[calc(100%-2.5rem)] lg:bg-gradient-to-r"
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 grid size-14 place-items-center rounded-full border border-ink-600 bg-ink-850 text-gold-700 lg:static"
                  >
                    <Icon className="size-6" strokeWidth={1.7} />
                  </span>

                  <div className="lg:mt-6">
                    <p className="font-display text-xs font-bold tracking-[0.22em] text-steel-400 uppercase">
                      Etapa {item.step}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-extrabold text-steel-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-steel-300">{item.text}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </RevealGroup>
      </div>
    </section>
  )
}
