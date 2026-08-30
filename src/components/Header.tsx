import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from '../lib/motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Logo } from './Logo'
import { ButtonLink } from './ui/Button'
import { DEFAULT_WHATS, MESSAGES, NAV, whatsLink } from '../data/site'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-gold-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-steel-100"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? 'border-b border-ink-700/80 bg-ink-900/85 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div className="container-page flex h-18 items-center justify-between gap-4">
          <a href="#topo" aria-label="Agro e Companhia — início" className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  scrolled ? 'text-steel-300 hover:text-gold-700' : 'text-white hover:text-gold-300'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* o wrapper controla a visibilidade: aplicar `hidden` direto no
                botão brigaria com o `inline-flex` do próprio componente */}
            <span className="hidden sm:block">
              <ButtonLink
                href={whatsLink(DEFAULT_WHATS, MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                sheen
              >
                <MessageCircle className="size-4.5" aria-hidden="true" />
                Fazer orçamento
              </ButtonLink>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink-600 text-steel-100 transition-colors duration-200 hover:border-gold-400/60 hover:text-gold-700 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <div className="hairline h-px w-full" aria-hidden="true" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-30 flex flex-col justify-end bg-ink-950/95 pb-8 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label="Menu mobile" className="container-page flex flex-col gap-1 pt-24">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center border-b border-ink-700 font-display text-2xl font-bold text-steel-100 transition-colors hover:text-gold-700"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <ButtonLink
                href={whatsLink(DEFAULT_WHATS, MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Falar no WhatsApp
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
