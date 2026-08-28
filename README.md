# Agro & Companhia — Landing Page

Landing page institucional e de captação de orçamentos da **Agro & Companhia** (Santa Helena — PR).
Produtos: **Módulo Agressivo** para plataforma Draper e **Caixa Organizadora**.

React 19 + TypeScript + Vite + Tailwind CSS v4 · animações com **Motion** e **GSAP/ScrollTrigger**.

---

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
```

---

## O que precisa ser trocado antes de publicar

Está tudo centralizado em **`src/data/site.ts`** — procure por `PLACEHOLDER`.

| Item | Onde | Situação |
| --- | --- | --- |
| Depoimentos de clientes | `TESTIMONIALS` | ⚠️ **100% fictícios — obrigatório substituir** |
| Logos/nomes de clientes | `CLIENTS` | ⚠️ fictício (peça autorização de uso da marca) |
| “500+ plataformas atendidas” | `STATS` | ⚠️ número chutado — confirmar |
| Fotos (produtos, oficina) | `public/images/*.svg` | ⚠️ placeholders |
| Logo da empresa | `src/components/Logo.tsx` | wordmark provisório em tipografia |
| Domínio no `canonical` e OG | `index.html` | ajustar ao domínio real |

Os telefones de WhatsApp, Instagram, cidade e a compatibilidade (John Deere 600/700, GTS, CNH)
já estão com os dados reais informados.

---

## Fotos que faltam — guia do que fotografar

Substitua os arquivos em `public/images/` mantendo os mesmos nomes (ou aponte outro caminho
em `site.ts`). Use **JPG/WebP** e comprima antes de subir.

| Arquivo | Proporção | O que fotografar |
| --- | --- | --- |
| `produto-modulo` | 3:2 | ⚠️ Ainda o placeholder. Fotos do módulo **instalado** na plataforma, close no rolo central — ver "Fotos de produto" abaixo. |
| `oficina` | 3:2 (1200×800) | Bancada / solda / corte de chapa. Prova de fabricação própria. |
| `detalhe-1`, `detalhe-2` | 1:1 | Closes de acabamento, solda e pintura (opcional, para uso futuro). |
| `og-cover.png` | 1200×630 | ✅ Pronta — gerada com a logo oficial. É o que aparece ao compartilhar o link no WhatsApp. |

**Direção de arte:** fotos reais, sem filtro pesado, contraste alto, tons quentes de fim de tarde
combinando com o dourado da marca. Evite banco de imagens genérico — o site inteiro vende
“feito por quem põe a mão na máquina”, e foto de estoque derruba isso.

**Logos de clientes:** PNG/SVG com fundo transparente, versão monocromática clara de preferência.

**Fotos de produto (carrossel):** cada produto em `src/data/site.ts` tem uma lista `images`
e a primeira da lista é a que abre o carrossel. Para adicionar fotos:

1. jogue os arquivos em `public/images/products/`;
2. rode `python3 scripts/fotos-produto.py` (gera os WebP de 1152, 720 e 200 px);
3. acrescente `photo('nome-do-arquivo-sem-extensão', 'texto alternativo')` na lista `images`
   do produto certo.

Com uma foto só o carrossel some — fica a imagem estática, sem setas nem miniaturas. As fotos
da caixa organizadora já estão no ar; as do módulo agressivo ainda são placeholder.

**Vídeo do hero:** `public/videos/video-colhedeira.mp4` (9:16, servido sem recompressão).
O `<video>` nasce só com o poster (`video-colhedeira-poster.webp`, 30 KB) e o MP4 só começa a
baixar depois do evento `load` da página — ver `src/components/HeroVideo.tsx`. Para trocar o
vídeo: substitua o MP4 e regere o poster com
`ffmpeg -i video-colhedeira.mp4 -frames:v 1 poster.png` + conversão para WebP.

**Marca própria:** a logo oficial vive em `public/images/logo-agro-companhia.png` (PNG com fundo
transparente, 900 px de largura) e é usada pelo componente `src/components/Logo.tsx` no header e
no rodapé. Os ícones (`public/favicon.ico`, `favicon-192.png`, `favicon-512.png`,
`apple-touch-icon.png`) são a mesma logo sobre um quadrado branco de cantos
arredondados. Para regerar tudo a partir de um novo arquivo de arte, o caminho é: recortar o
fundo, salvar o PNG transparente em `public/images/` e recompor os ícones no mesmo enquadramento.

---

## Estrutura

```
src/
  data/site.ts          ← TODO o conteúdo do site
  lib/
    gsap.ts             registro do GSAP + ScrollTrigger (chunk separado)
    motion.ts           barrel do Motion (componentes "mini" + LazyMotion)
    useNearViewport.ts  adia downloads pesados até a seção chegar perto
  components/
    Header, Hero, TrustBar, Products, Differentials,
    Process (GSAP), Coverage, Founders, Testimonials,
    Faq, CtaContact, Footer, FloatingWhats, Logo
    ui/  Button, Reveal, icons
```

### Ordem das seções

Hero → prova social (clientes + números) → produtos → diferenciais → processo (GSAP) →
aplicações/cobertura → sócios → depoimentos → FAQ → CTA → rodapé.

---

## Animações

- **Motion** — entradas em scroll (`Reveal`/`RevealGroup`), parallax do hero, menu mobile,
  acordeão do FAQ e o botão flutuante de WhatsApp.
- **GSAP + ScrollTrigger** — duas coisas:
  1. **Seção “Do aço ao talhão”** (`Process.tsx`): em telas ≥1024px a seção é *pinada* e as
     4 etapas correm na horizontal com barra de progresso sincronizada. Abaixo disso vira uma
     lista vertical comum.
  2. **Contadores** dos números (`TrustBar.tsx`).

Tudo respeita `prefers-reduced-motion`: com a opção ligada no sistema, o GSAP nem é baixado e
os reveals renderizam estáticos.

---

## Performance

- Bundle inicial: **~103 kB gzip de JS + ~9 kB de CSS**.
- Seções abaixo da dobra entram por `React.lazy` (chunks de 1–2 kB cada).
- GSAP (44 kB gzip) só é baixado quando a seção correspondente se aproxima da viewport.
- Motion usa componentes `m` + `LazyMotion` em vez da biblioteca inteira.
- Zero requisição de imagem externa; fontes com `preload` + `display=swap`.
- Sem scroll horizontal em 390px e 1440px (verificado).

---

## Acessibilidade

- Skip link, navegação por teclado, `:focus-visible` dourado em tudo que é interativo.
- Alvos de toque ≥ 44px, `aria-expanded`/`aria-controls` no menu e no FAQ, `Esc` fecha o menu.
- Contraste de texto acima de 4.5:1 no tema escuro.
- Marcas de terceiros citadas apenas como compatibilidade, com aviso no rodapé.
