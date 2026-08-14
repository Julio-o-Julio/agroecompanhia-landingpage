import { MessageCircle, MapPin, Clock } from 'lucide-react'
import { InstagramIcon } from './ui/icons'
import { CONTACTS, MESSAGES, WHATSAPP, whatsLink } from '../data/site'
import { ButtonLink } from './ui/Button'
import { Reveal } from './ui/Reveal'

export function CtaContact() {
  return (
    <section id="contato" className="relative scroll-mt-24 overflow-hidden bg-ink-950 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/12 blur-[120px]"
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-extrabold">
              Manda o modelo da sua plataforma.{' '}
              <span className="text-gradient-gold md:block">A gente resolve o resto.</span>
            </h2>
            <p className="mt-5 text-lg text-steel-300">
              Orçamento sem compromisso, direto com quem fabrica. Responda em minutos, não em dias
              úteis.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {WHATSAPP.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col rounded-2xl border border-ink-700 bg-ink-850/90 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-gold-400/40"
            >
              <p className="text-xs tracking-[0.18em] text-gold-700 uppercase">{contact.label}</p>
              <p className="mt-3 font-display text-2xl font-extrabold text-steel-100 tabular-nums">
                {contact.display}
              </p>
              <p className="mt-2 flex-1 text-sm text-steel-400">{contact.region}</p>
              <ButtonLink
                href={whatsLink(contact, MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="mt-6 w-full"
                sheen
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Chamar no WhatsApp
              </ButtonLink>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.14}>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-steel-400">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-gold-700" aria-hidden="true" />
              {CONTACTS.city} — {CONTACTS.state}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-gold-700" aria-hidden="true" />
              Seg a sex, 8h às 18h — na safra, todo dia
            </li>
            <li>
              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-2 transition-colors duration-200 hover:text-gold-700"
              >
                <InstagramIcon className="size-4 text-gold-700" aria-hidden="true" />
                {CONTACTS.instagramHandle}
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
