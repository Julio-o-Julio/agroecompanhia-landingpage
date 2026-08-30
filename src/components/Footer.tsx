import { MessageCircle } from 'lucide-react'
import { InstagramIcon } from './ui/icons'
import { CONTACTS, MESSAGES, NAV, PRODUCTS, WHATSAPP, whatsLink } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900 pt-14 pb-8">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo withTagline />
            <p className="mt-5 max-w-sm text-sm text-steel-400">
              Manutenção e fabricação de equipamentos para colheitadeiras há mais de 20 anos.
              Módulo agressivo para plataforma Draper e caixa organizadora — desenvolvimento
              próprio, feito em {CONTACTS.city} — {CONTACTS.state}.
            </p>
            <a
              href={CONTACTS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-600 px-4 text-sm font-semibold text-steel-200 transition-colors duration-200 hover:border-gold-400/60 hover:text-gold-700"
            >
              <InstagramIcon className="size-4" aria-hidden="true" />
              {CONTACTS.instagramHandle}
            </a>
          </div>

          <nav aria-label="Rodapé — navegação">
            <h2 className="font-display text-sm font-bold tracking-[0.18em] text-steel-100 uppercase">
              Navegar
            </h2>
            <ul className="mt-4 space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-sm text-steel-400 transition-colors duration-200 hover:text-gold-700"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="inline-flex min-h-9 items-center text-sm text-steel-400 transition-colors duration-200 hover:text-gold-700"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold tracking-[0.18em] text-steel-100 uppercase">
              Falar com a gente
            </h2>
            <ul className="mt-4 space-y-3">
              {WHATSAPP.map((c) => (
                <li key={c.id}>
                  <a
                    href={whatsLink(c, MESSAGES.hero)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-11 items-center gap-2.5 text-sm text-steel-400 transition-colors duration-200 hover:text-gold-700"
                  >
                    <MessageCircle className="size-4 shrink-0 text-gold-700" aria-hidden="true" />
                    <span>
                      <span className="block font-semibold text-steel-200 tabular-nums group-hover:text-gold-700">
                        {c.display}
                      </span>
                      <span className="block text-xs">{c.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-700 pt-6 text-xs text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Agro &amp; Companhia. Todos os direitos reservados.
          </p>
          <p>
            Marcas citadas (John Deere, Case IH, New Holland, GTS) pertencem aos seus respectivos
            titulares e são mencionadas apenas para indicar compatibilidade.
          </p>
        </div>

        <a
          href="https://terior.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 flex flex-col items-center justify-center gap-2 text-xs text-steel-400 sm:flex-row sm:gap-3"
        >
          <span className="inline-flex items-center gap-2">
            <span className="opacity-80 transition-opacity duration-200 group-hover:opacity-100">
              Produced in
            </span>
            <img
              src="/logo-terior.svg"
              width="64"
              height="20"
              loading="lazy"
              alt="Terior"
              className="h-5 w-auto"
            />
          </span>
          <span aria-hidden="true" className="hidden h-4 w-px bg-ink-600 sm:inline-block" />
          <span className="opacity-80 transition-opacity duration-200 group-hover:opacity-100">
            Desenvolvido e mantido por Terior
          </span>
        </a>
      </div>
    </footer>
  )
}
