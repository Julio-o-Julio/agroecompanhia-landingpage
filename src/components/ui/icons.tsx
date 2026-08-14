import type { SVGProps } from 'react'

/**
 * Ícones de marca não vêm mais na lucide-react (v1+), então ficam aqui —
 * mesmo peso de traço (1.8) e caixa 24 do restante do set, para manter
 * a consistência visual dos ícones.
 */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
