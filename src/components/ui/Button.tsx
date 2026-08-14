import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold ' +
  'transition-[transform,background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  'cursor-pointer select-none active:scale-[0.98] touch-manipulation whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary:
    'bg-gold-400 text-steel-100 shadow-[0_6px_20px_-8px_rgba(125,81,0,0.55)] hover:bg-gold-300 hover:shadow-[0_10px_28px_-8px_rgba(125,81,0,0.65)]',
  secondary:
    'border border-ink-600 bg-ink-800/80 text-steel-100 backdrop-blur-sm hover:border-gold-400/60 hover:bg-ink-700',
  ghost: 'text-steel-200 hover:text-gold-700',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 text-[0.95rem]',
  lg: 'min-h-13 px-7 text-base',
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: Size
  children: ReactNode
  sheen?: boolean
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  sheen = false,
  ...props
}: Props) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {sheen && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 opacity-0 group-hover:opacity-100 group-hover:[animation:sheen_0.9s_ease-out]"
        />
      )}
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </a>
  )
}
