/**
 * Resolve um caminho de `public/` respeitando o `base` do Vite.
 *
 * Em produção no GitHub Pages o site é servido sob `/<nome-do-repo>/`,
 * então `/images/foo.svg` daria 404. `import.meta.env.BASE_URL` já vem
 * com a barra final (`/` em dev, `/agroecompanhia-landingpage/` no Pages).
 */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
