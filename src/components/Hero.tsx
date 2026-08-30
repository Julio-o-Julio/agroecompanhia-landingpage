import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from '../lib/motion'
import { ArrowDown, MessageCircle, ShieldCheck, Factory, MapPin } from 'lucide-react'
import { ButtonLink } from './ui/Button'
import { HeroVideo } from './HeroVideo'
import { asset } from '../lib/asset'
import { DEFAULT_WHATS, MESSAGES, whatsLink } from '../data/site'

const HEADLINE = ['Equipamentos', 'que fazem', 'sua colheita']

/** Fecho rotativo do título — completa "…sua colheita ___". */
const ROTATING = ['render mais', 'perder menos', 'fluir melhor', 'não parar']
const ROTATE_MS = 2800

const chips = [
  { icon: ShieldCheck, label: '+20 anos de estrada' },
  { icon: Factory, label: 'Fabricação própria' },
  { icon: MapPin, label: 'Sul, Centro-Oeste e Paraguai' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '5%'])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '35%'])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '8%'])
  const [phrase, setPhrase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPhrase((i) => (i + 1) % ROTATING.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="topo"
      ref={ref}
      className="relative isolate overflow-hidden bg-ink-900 pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* fundo: foto da lavoura ao pôr do sol */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 -z-30 scale-110"
      >
        <img
          src={asset('/images/hero-lavoura-1536.webp')}
          srcSet={`${asset('/images/hero-lavoura-960.webp')} 960w, ${asset('/images/hero-lavoura-1536.webp')} 1536w`}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-center"
        />
      </motion.div>
      {/* máscara: escurece a foto para o texto branco ganhar contraste */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 bg-black/35" />

      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="absolute -top-40 -right-20 -z-10 size-[38rem] rounded-full bg-gold-500/12 blur-[130px]"
      />
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_22rem] lg:gap-16">
        {/* ---------- coluna texto ---------- */}
        <div>
          <h1 className="font-display text-[clamp(2.4rem,7.2vw,4.6rem)] font-extrabold text-white">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={{ y: '108%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-grid align-bottom text-gold-400">
                  {/* sizers invisíveis: reservam a largura da maior frase para o
                      layout não reflowar a cada troca */}
                  {ROTATING.map((text) => (
                    <span
                      key={text}
                      aria-hidden="true"
                      className="invisible col-start-1 row-start-1 whitespace-nowrap"
                    >
                      {text}
                    </span>
                  ))}
                  {/* as frases se cruzam empilhadas no mesmo espaço: a que sai
                      sobe enquanto a que entra vem de baixo, sem linha vazia */}
                  <span className="relative col-start-1 row-start-1 overflow-hidden">
                    <AnimatePresence initial={false}>
                      <motion.span
                        key={ROTATING[phrase]}
                        className="absolute inset-x-0 top-0 block whitespace-nowrap"
                        initial={{ y: reduced ? 0 : '108%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: reduced ? 0 : '-108%', opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {ROTATING[phrase]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-xl text-[1.05rem] text-white md:text-lg"
          >
            Mais de 20 anos de manutenção e fabricação para colheitadeiras. Dois produtos
            desenvolvidos por nós: o{' '}
            <strong className="font-semibold text-white">módulo agressivo</strong> para
            plataforma Draper e a{' '}
            <strong className="font-semibold text-white">caixa organizadora</strong> — a única do
            mercado brasileiro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink
              href={whatsLink(DEFAULT_WHATS, MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              sheen
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Pedir orçamento no WhatsApp
            </ButtonLink>
            <ButtonLink href="#produtos" variant="secondary" size="lg">
              Conhecer os produtos
              <ArrowDown className="size-4.5 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3"
          >
            {chips.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-white">
                <Icon className="size-4 text-gold-700" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---------- coluna vídeo (9:16) ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-[20rem] lg:max-w-none"
        >
          <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-ink-600 bg-ink-800">
            <motion.div style={{ y: imgY }} className="size-full scale-[1.12]">
              <HeroVideo />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/20 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* card flutuante */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="absolute -bottom-6 -left-3 w-[min(19rem,88%)] rounded-xl border border-ink-600 bg-ink-850/95 p-4 backdrop-blur-sm sm:left-6"
          >
            <p className="font-display text-3xl font-extrabold text-gold-700">Draper</p>
            <p className="mt-1 text-sm text-steel-300">
              John Deere 600/700 · GTS · CNH — aplicação confirmada antes do orçamento.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
