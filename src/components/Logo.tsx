import { asset } from '../lib/asset'

/**
 * Wordmark da Agro & Companhia.
 * Arte oficial em PNG com fundo transparente (`/images/logo-agro-companhia.png`)
 * — o traço já traz o contorno branco + sombra preta, então funciona tanto
 * sobre o fundo claro da página quanto sobre as faixas recuadas.
 */
export function Logo({
  className = '',
  withTagline = false,
}: {
  className?: string
  withTagline?: boolean
}) {
  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <img
        src={asset('/images/logo-agro-companhia.png')}
        alt="Agro & Companhia"
        width={900}
        height={489}
        decoding="async"
        className={`w-auto ${withTagline ? 'h-16' : 'h-11 sm:h-13'}`}
      />
      {withTagline ? (
        <span className="mt-2.5 text-[0.62rem] tracking-[0.28em] text-steel-400 uppercase">
          Para quem vive do agro
        </span>
      ) : null}
    </span>
  )
}
