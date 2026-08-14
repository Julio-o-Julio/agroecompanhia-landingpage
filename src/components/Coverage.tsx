import { MessageCircle, Tractor, MapPin } from 'lucide-react'
import { COMPATIBILITY, COVERAGE, WHATSAPP, MESSAGES, whatsLink } from '../data/site'
import { Reveal, RevealGroup } from './ui/Reveal'
import { motion, useReducedMotion, revealItem } from '../lib/motion'

export function Coverage() {
  const reduced = useReducedMotion()

  return (
    <section id="aplicacoes" className="bg-plate scroll-mt-24 py-20 md:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-16">
        {/* -------- compatibilidade -------- */}
        <div>
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
              Aplicações
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,2.8rem)] font-extrabold">
              Serve na sua plataforma?
            </h2>
            <p className="mt-4 text-steel-300">
              O módulo agressivo é desenvolvido para plataformas Draper. Confirmamos a aplicação
              pelo modelo e ano antes de qualquer orçamento — sem surpresa na hora de instalar.
            </p>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-3">
            {COMPATIBILITY.map((item) => (
              <motion.div
                key={item.brand}
                variants={reduced ? undefined : revealItem}
                className="flex items-center gap-4 rounded-xl border border-ink-700 bg-ink-850 p-4 transition-colors duration-300 hover:border-gold-400/40"
              >
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-lg bg-ink-800 text-gold-700"
                >
                  <Tractor className="size-5.5" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-steel-100">{item.brand}</h3>
                  <p className="text-sm text-steel-400">{item.models}</p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mt-5 text-sm text-steel-400">
              Não achou o seu modelo?{' '}
              <a
                href={whatsLink(WHATSAPP[0], MESSAGES.suporte)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold-700 underline underline-offset-4 hover:text-gold-600"
              >
                Manda uma foto no WhatsApp
              </a>{' '}
              que a gente avalia a adaptação.
            </p>
          </Reveal>
        </div>

        {/* -------- cobertura -------- */}
        <div>
          <Reveal>
            <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
              Onde atendemos
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,2.8rem)] font-extrabold">
              Do Oeste do Paraná ao cerrado baiano
            </h2>
            <p className="mt-4 text-steel-300">
              Enviamos para todo o Brasil, com atendimento dedicado nas praças onde a gente já tem
              máquina rodando com nossos equipamentos.
            </p>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-3">
            {COVERAGE.regions.map((region) => {
              const contact = WHATSAPP.find((w) => w.id === region.contact) ?? WHATSAPP[0]
              return (
                <motion.div
                  key={region.name}
                  variants={reduced ? undefined : revealItem}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-ink-700 bg-ink-850 p-5"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-gold-700" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-base font-bold text-steel-100">
                        {region.name}
                      </h3>
                      <p className="text-sm text-steel-400">{region.detail}</p>
                    </div>
                  </div>
                  <a
                    href={whatsLink(contact, MESSAGES.hero)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-ink-600 px-4 text-sm font-semibold text-steel-100 transition-colors duration-200 hover:border-gold-400/60 hover:text-gold-700"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {contact.display}
                  </a>
                </motion.div>
              )
            })}
          </RevealGroup>

          <Reveal delay={0.1}>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Estados atendidos">
              {COVERAGE.primary.map((uf) => (
                <li
                  key={uf}
                  className="rounded-md border border-ink-600 bg-ink-800 px-3 py-1.5 font-display text-sm font-bold tracking-wide text-steel-300"
                >
                  {uf}
                </li>
              ))}
              <li className="rounded-md border border-gold-400/40 bg-gold-400/10 px-3 py-1.5 font-display text-sm font-bold tracking-wide text-gold-700">
                + Brasil
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
