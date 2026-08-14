/**
 * Ponto único de entrada do Motion.
 *
 * Usamos os componentes "mini" (`motion/react-m`) + <LazyMotion features={domAnimation}>
 * no App: assim entra no bundle só o conjunto de features que a página realmente
 * usa (animate, whileInView, whileHover, whileTap, exit) em vez da biblioteca inteira.
 */
export * as motion from 'motion/react-m'
export {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'

/** Variante padrão dos itens escalonados dentro de <RevealGroup>. */
export const revealItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}
