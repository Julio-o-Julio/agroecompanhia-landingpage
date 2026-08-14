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
| Nomes, cargos e frases dos 2 sócios | `FOUNDERS` | ⚠️ fictício |
| Depoimentos de clientes | `TESTIMONIALS` | ⚠️ **100% fictícios — obrigatório substituir** |
| Logos/nomes de clientes | `CLIENTS` | ⚠️ fictício (peça autorização de uso da marca) |
| “500+ plataformas atendidas” | `STATS` | ⚠️ número chutado — confirmar |
| Fotos (produtos, sócios, oficina) | `public/images/*.svg` | ⚠️ placeholders |
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
| `hero-plataforma` | 1:1 (1200×1200) | Colheitadeira com a plataforma Draper **em operação**, na lavoura, luz de fim de tarde. Máquina em 3/4, poeira/palha no ar. É a primeira imagem do site — vale contratar. |
| `produto-modulo` | 4:3 (1200×900) | O módulo **instalado** na plataforma, close no rolo central. Peça limpa, foco no detalhe da geometria. |
| `produto-caixa` | 4:3 (1200×900) | A caixa **aberta**, com ferramentas organizadas dentro, montada na máquina. |
| `socio-1` / `socio-2` | 3:2 ou 4:5 | Retrato dos sócios, camisa da empresa, olhando para a câmera, fundo real: um na oficina, outro na lavoura. Nada de fundo branco de estúdio. |
| `oficina` | 3:2 (1200×800) | Bancada / solda / corte de chapa. Prova de fabricação própria. |
| `detalhe-1`, `detalhe-2` | 1:1 | Closes de acabamento, solda e pintura (opcional, para uso futuro). |
| `og-cover` | 1200×630 | Imagem que aparece ao compartilhar o link no WhatsApp. |

**Direção de arte:** fotos reais, sem filtro pesado, contraste alto, tons quentes de fim de tarde
combinando com o dourado da marca. Evite banco de imagens genérico — o site inteiro vende
“feito por quem põe a mão na máquina”, e foto de estoque derruba isso.

**Logos de clientes:** PNG/SVG com fundo transparente, versão monocromática clara de preferência.

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
