/**
 * Wordmark provisório da Agro & Companhia.
 * Construído em tipografia (nada de imagem) — troca fácil quando a logo
 * definitiva ficar pronta: basta substituir o conteúdo deste componente.
 */
export function Logo({
  className = '',
  withTagline = false,
}: {
  className?: string
  withTagline?: boolean
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-lg bg-gold-400 font-display text-[1.05rem] leading-none font-extrabold text-steel-100"
      >
        A&amp;
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-extrabold tracking-tight text-steel-100">
          AGRO <span className="text-gold-700">&amp;</span> COMPANHIA
        </span>
        {withTagline ? (
          <span className="mt-1 text-[0.62rem] tracking-[0.28em] text-steel-400 uppercase">
            Para quem vive do agro
          </span>
        ) : (
          <span className="mt-0.5 text-[0.6rem] tracking-[0.22em] text-steel-400 uppercase">
            Equipamentos para colheita
          </span>
        )}
      </span>
    </span>
  )
}
