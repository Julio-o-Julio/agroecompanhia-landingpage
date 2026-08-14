/**
 * Módulo mínimo e sem dependências: precisa ser consultado ANTES do
 * `import()` do GSAP, senão o chunk é baixado à toa por quem pediu
 * menos movimento no sistema.
 */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
