import { motion, useReducedMotion, revealItem } from '../lib/motion'
import { Check, MessageCircle, Sparkles } from 'lucide-react'
import { PRODUCTS, DEFAULT_WHATS, whatsLink } from '../data/site'
import type { Product } from '../data/site'
import { ButtonLink } from './ui/Button'
import { Reveal, RevealGroup } from './ui/Reveal'
import { Carousel } from './ui/Carousel'

function ProductBlock({ product, index }: { product: Product; index: number }) {
  const reduced = useReducedMotion()
  const flipped = index % 2 === 1

  return (
    <article
      id={product.id}
      className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* imagem */}
      <Reveal
        y={30}
        className={`relative ${flipped ? 'lg:order-2' : ''}`}
      >
        <Carousel images={product.images} />

        <div className="absolute -top-3 left-5 z-10 inline-flex items-center gap-2 rounded-full bg-gold-400 px-3.5 py-1.5 text-xs font-bold tracking-wide text-steel-100 uppercase">
          <Sparkles className="size-3.5" aria-hidden="true" />
          {product.badge}
        </div>

        {/* specs */}
        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700">
          {product.specs.map((spec) => (
            <div key={spec.label} className="bg-ink-850 p-4">
              <dt className="text-[0.68rem] tracking-[0.14em] text-steel-400 uppercase">
                {spec.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-steel-100">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* texto */}
      <div className={flipped ? 'lg:order-1' : ''}>
        <Reveal>
          <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
            {product.eyebrow}
          </p>
          <h3 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-extrabold">
            {product.name}
          </h3>
          <p className="mt-3 font-display text-lg font-semibold text-gold-700 md:text-xl">
            {product.tagline}
          </p>
          <p className="mt-5 text-steel-300">{product.description}</p>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2">
          {product.bullets.map((b) => (
            <motion.div key={b.title} variants={reduced ? undefined : revealItem}>
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold-400/12 text-gold-700"
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-steel-100">{b.title}</h4>
                  <p className="mt-1 text-sm text-steel-400">{b.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-9">
          <ButtonLink
            href={whatsLink(DEFAULT_WHATS, product.whatsMessage)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            sheen
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Orçamento {product.article} {product.name}
          </ButtonLink>
        </Reveal>
      </div>
    </article>
  )
}

export function Products() {
  return (
    <section id="produtos" className="bg-plate scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
            Nossos produtos
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-extrabold">
            Dois produtos. Os dois desenvolvidos aqui dentro.
          </h2>
          <p className="mt-5 text-lg text-steel-300">
            Nada de revenda de catálogo. Cada peça foi desenhada, fabricada e testada por quem passa
            o dia consertando colheitadeira.
          </p>
        </Reveal>

        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {PRODUCTS.map((product, i) => (
            <ProductBlock key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
