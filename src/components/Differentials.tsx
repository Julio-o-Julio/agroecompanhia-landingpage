import { motion, useReducedMotion, revealItem } from '../lib/motion'
import { Wrench, Lightbulb, ShieldCheck, Headset } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { DIFFERENTIALS } from '../data/site'
import { Reveal, RevealGroup } from './ui/Reveal'

const ICONS: Record<string, LucideIcon> = {
  wrench: Wrench,
  lightbulb: Lightbulb,
  shield: ShieldCheck,
  headset: Headset,
}

export function Differentials() {
  const reduced = useReducedMotion()

  return (
    <section id="diferenciais" className="scroll-mt-24 bg-ink-900 py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
              Por que a Agro &amp; Companhia
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.3rem)] font-extrabold">
              Vinte anos de oficina viram dois produtos que não existiam.
            </h2>
            <p className="mt-5 text-lg text-steel-300">
              A gente não começou vendendo peça. Começou consertando máquina quebrada no meio da
              safra — e foi daí que saiu tudo o que fabricamos hoje.
            </p>

            <div className="mt-8 rounded-xl border-l-2 border-gold-400 bg-ink-850/70 p-5">
              <p className="font-display text-lg font-semibold text-steel-100">
                “A caixa organizadora é única no mercado brasileiro. O módulo agressivo é uma
                evolução do sistema de alimentação da plataforma.”
              </p>
              <p className="mt-2 text-sm text-steel-400">
                Os dois nasceram de problema real de quem colhe.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {DIFFERENTIALS.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <motion.div
                  key={item.title}
                  variants={reduced ? undefined : revealItem}
                  className="group relative overflow-hidden rounded-xl border border-ink-700 bg-ink-850 p-6 transition-colors duration-300 hover:border-gold-400/40"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 size-32 rounded-full bg-gold-400/0 blur-2xl transition-colors duration-500 group-hover:bg-gold-400/12"
                  />
                  <span className="relative grid size-11 place-items-center rounded-lg bg-gold-400/12 text-gold-700">
                    <Icon className="size-5.5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-5 font-display text-lg font-bold text-steel-100">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-sm text-steel-400">{item.text}</p>
                </motion.div>
              )
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
