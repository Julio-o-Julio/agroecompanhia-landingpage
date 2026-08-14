import { motion, useReducedMotion } from '../../lib/motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}

/**
 * Reveal on scroll. Anima só transform/opacity (sem reflow) e respeita
 * prefers-reduced-motion — nesse caso o conteúdo aparece direto.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: Props) {
  const reduced = useReducedMotion()
  const Comp = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}

/** Container que escalona a entrada dos filhos (30–50ms por item). */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}
