import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from '../lib/motion'
import { MessageCircle, X } from 'lucide-react'
import { MESSAGES, WHATSAPP, whatsLink } from '../data/site'

/** Botão flutuante de WhatsApp com escolha de praça (aparece após o hero). */
export function FloatingWhats() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const wrap = useRef<HTMLDivElement>(null)
  const botao = useRef<HTMLButtonElement>(null)

  // Ao esconder o botão o cartão também some; zerar `open` junto evita que ele
  // reapareça aberto sozinho quando o usuário rolar para baixo de novo.
  useMotionValueEvent(scrollY, 'change', (v) => {
    const proximo = v > 700
    setVisible(proximo)
    if (!proximo) setOpen(false)
  })

  /**
   * Fecha ao tocar/clicar fora do conjunto (botão + cartão) ou ao apertar Esc.
   *
   * `pointerdown` cobre mouse e toque de uma vez e dispara antes do `click`,
   * então clicar direto num link de outra parte da página fecha o cartão e
   * ainda navega no mesmo gesto. O próprio botão flutuante fica dentro de
   * `wrap`, então ele continua alternando aberto/fechado como antes.
   */
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      // devolve o foco ao botão: quem fechou pelo teclado não fica perdido
      botao.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={wrap}
      className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
    >
      <AnimatePresence>
        {open && visible && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(20rem,calc(100vw-2rem))] origin-bottom-right rounded-2xl border border-ink-600 bg-ink-850 p-4 shadow-xl shadow-steel-100/15"
          >
            <p className="font-display text-base font-bold text-steel-100">Falar no WhatsApp</p>
            <p className="mt-1 text-sm text-steel-400">Escolha o atendimento mais perto de você.</p>
            <ul className="mt-4 space-y-2">
              {WHATSAPP.map((c) => (
                <li key={c.id}>
                  <a
                    href={whatsLink(c, MESSAGES.hero)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 cursor-pointer flex-col justify-center rounded-lg border border-ink-600 px-4 py-2 transition-colors duration-200 hover:border-gold-400/60 hover:bg-ink-800"
                  >
                    <span className="font-semibold text-steel-100 tabular-nums">{c.display}</span>
                    <span className="text-xs text-steel-400">{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.button
            ref={botao}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fechar opções de WhatsApp' : 'Abrir opções de WhatsApp'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid size-14 cursor-pointer place-items-center rounded-full bg-gold-400 text-steel-100 shadow-[0_10px_26px_-8px_rgba(125,81,0,0.6)] transition-colors duration-200 hover:bg-gold-300"
          >
            {open ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <MessageCircle className="size-6" aria-hidden="true" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
