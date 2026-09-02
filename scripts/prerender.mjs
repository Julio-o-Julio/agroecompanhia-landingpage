/**
 * Gera `dist/prerender.html`: a mesma página, com o conteúdo já preenchido.
 *
 * Por quê
 * -------
 * O site é uma SPA React. O HTML publicado é só `<div id="root"></div>` e o
 * conteúdo só existe depois que o JavaScript roda. Buscadores demoram semanas
 * para renderizar isso e os robôs de IA (GPTBot, ClaudeBot, PerplexityBot…)
 * não executam JavaScript — para eles a página chega vazia.
 *
 * Como
 * ----
 * Abrimos o build num Chromium headless com `prefers-reduced-motion: reduce`.
 * Esse modo já existe no site: os `Reveal` renderizam estáticos e o GSAP nem
 * é baixado. Ou seja, o HTML capturado sai com o conteúdo visível, sem
 * `opacity: 0` congelado de animação que não terminou.
 *
 * O `dist/index.html` NÃO é tocado: quem visita continua recebendo o site
 * como sempre, com todas as animações. Só os robôs recebem o `prerender.html`
 * — o desvio está em `public/.htaccess`.
 *
 * Se o Chromium não estiver disponível o build NÃO quebra: avisa e segue.
 * O `.htaccess` só desvia robôs se o arquivo existir de fato.
 */

import { createServer } from 'node:http'
import { readFile, writeFile, stat } from 'node:fs/promises'
import { join, extname, resolve } from 'node:path'

const DIST = resolve(import.meta.dirname, '..', 'dist')
const ORIGIN = 'https://agroecompanhia.com.br'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
}

/** Servidor estático mínimo sobre dist/ — só para o Chromium ter o que abrir. */
function serve() {
  const server = createServer(async (req, res) => {
    try {
      const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
      const file = join(DIST, path === '/' ? 'index.html' : path)
      if (!file.startsWith(DIST)) {
        res.writeHead(403).end()
        return
      }
      const body = await readFile(file)
      res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404).end('not found')
    }
  })
  return new Promise((ok) => server.listen(0, '127.0.0.1', () => ok(server)))
}

async function main() {
  try {
    await stat(join(DIST, 'index.html'))
  } catch {
    console.error('[prerender] dist/index.html não existe — rode o build antes.')
    process.exit(1)
  }

  let chromium
  try {
    ;({ chromium } = await import('playwright'))
  } catch {
    console.warn('[prerender] playwright não instalado — pulando. O site publica normalmente,')
    console.warn('[prerender] mas robôs e IAs continuarão vendo a página vazia.')
    return
  }

  const server = await serve()
  const base = `http://127.0.0.1:${server.address().port}`
  let browser

  try {
    browser = await chromium.launch()
    const page = await browser.newPage({
      // O site respeita esta preferência: reveals entram estáticos e o GSAP
      // não é baixado. É exatamente o estado que queremos congelar em HTML.
      reducedMotion: 'reduce',
      viewport: { width: 1280, height: 2400 },
    })

    await page.goto(base, { waitUntil: 'networkidle', timeout: 60_000 })

    // As seções abaixo da dobra entram por React.lazy. Rolar a página inteira
    // força o download desses chunks antes de capturarmos o HTML.
    await page.evaluate(async () => {
      const step = window.innerHeight
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState('networkidle')

    // Só seguimos se o conteúdo realmente montou.
    await page.waitForSelector('#root h1', { timeout: 30_000 })

    // O acordeão do FAQ só monta no DOM a resposta que está aberta — as
    // outras seis não existiriam no HTML capturado. Abrimos uma a uma e
    // guardamos o texto para reinserir todas na captura.
    const faqAnswers = await page.evaluate(async () => {
      const buttons = [...document.querySelectorAll('#faq button[aria-controls^="faq-panel-"]')]
      const out = []
      for (const button of buttons) {
        const id = button.getAttribute('aria-controls')
        if (button.getAttribute('aria-expanded') !== 'true') button.click()
        await new Promise((r) => setTimeout(r, 350))
        out.push({
          id,
          question: button.innerText.trim(),
          text: document.getElementById(id)?.innerText?.trim() ?? '',
        })
      }
      return out
    })

    // Marca o que está escondido por CSS ANTES de clonar: no clone não existe
    // estilo computado. É isto que impede o texto invisível de vazar para os
    // robôs — o marquee de clientes e os depoimentos ficam no DOM com
    // `display: none` enquanto SHOW_SOCIAL_PROOF for false, e sem esta
    // limpeza um assistente de IA leria nomes fictícios como se fossem reais.
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('body *')) {
        const s = getComputedStyle(el)
        if (s.display === 'none' || s.visibility === 'hidden') {
          el.setAttribute('data-prerender-oculto', '')
        }
      }
    })

    const html = await page.evaluate((answers) => {
      const doc = document.cloneNode(true)

      // Some com o que está invisível para o visitante. O que a pessoa não vê,
      // o robô também não deve ler.
      doc.querySelectorAll('[data-prerender-oculto]').forEach((el) => el.remove())

      // Fora tudo que só faz sentido com JavaScript rodando: o robô não
      // executa nada, e deixar as tags só engorda o HTML.
      // Fora os scripts de código — mas os blocos JSON-LD (dados estruturados
      // da empresa e dos produtos) FICAM: é justamente o que o robô lê.
      doc
        .querySelectorAll('script:not([type="application/ld+json"])')
        .forEach((el) => el.remove())

      // O <noscript> é o resumo de emergência para robôs que não recebem esta
      // versão. Aqui o conteúdo completo já está na página — manter os dois
      // só repetiria tudo em dobro no texto extraído.
      doc.querySelectorAll('noscript').forEach((el) => el.remove())
      doc.querySelectorAll('link[rel="modulepreload"], link[rel="preload"]').forEach((el) =>
        el.remove(),
      )

      // O fecho rotativo do hero mantém as variantes escondidas no DOM só
      // para reservar largura ("perder menos", "fluir melhor", "não parar").
      // No HTML estático elas colariam todas dentro do <h1>, deixando o
      // título sem sentido para quem lê sem CSS.
      // A primeira variante escondida é a que o site mostra ao carregar:
      // guardamos ela para o título não sair com um fecho aleatório.
      const fechoCanonico = doc
        .querySelector('h1 [aria-hidden="true"].invisible')
        ?.textContent?.trim()
      doc.querySelectorAll('[aria-hidden="true"].invisible').forEach((el) => el.remove())

      // O <h1> é montado em blocos de linha e termina no fecho rotativo, que
      // muda a cada 2,8s. Quem lê o HTML sem CSS recebe "Equipamentosque
      // fazemsua colheita" mais a frase que por acaso estava na tela. Aqui o
      // título vira uma linha só, sempre com o mesmo fecho.
      const h1 = doc.querySelector('h1')
      if (h1) {
        const linhas = [...h1.children].map((el) => el.textContent.trim()).filter(Boolean)
        if (fechoCanonico && linhas.length) linhas[linhas.length - 1] = fechoCanonico
        h1.textContent = linhas.join(' ').replace(/\s+/g, ' ')
      }

      // Reinsere as respostas do FAQ que o acordeão não deixa no DOM.
      for (const { id, text } of answers) {
        if (!text || doc.getElementById(id)) continue
        const button = doc.querySelector(`button[aria-controls="${id}"]`)
        const li = button?.closest('li')
        if (!li) continue
        const panel = doc.createElement('div')
        panel.id = id
        const p = doc.createElement('p')
        p.className = 'max-w-2xl pr-12 pb-6 text-steel-300'
        p.textContent = text
        panel.appendChild(p)
        li.appendChild(panel)
      }

      // Animações que ficaram no meio do caminho deixam `opacity: 0` fixo no
      // style inline. Num HTML estático isso é conteúdo invisível — e o
      // Google desconta o peso de texto oculto. Zeramos esses resíduos.
      doc.querySelectorAll('[style]').forEach((el) => {
        const s = el.getAttribute('style')
        if (!s) return
        const cleaned = s
          .replace(/opacity:\s*0(\.\d+)?\s*;?/g, '')
          .replace(/transform:\s*translateY\([^)]*\)\s*;?/g, '')
          .trim()
        if (cleaned) el.setAttribute('style', cleaned)
        else el.removeAttribute('style')
      })

      doc
        .querySelectorAll('[data-prerender-oculto]')
        .forEach((el) => el.removeAttribute('data-prerender-oculto'))

      return '<!doctype html>\n' + doc.documentElement.outerHTML
    }, faqAnswers)

    // Caminhos relativos viram absolutos: o robô pode estar lendo este HTML
    // fora do contexto do domínio.
    const absolute = html
      .replace(/(\s(?:href|src))="\/(?!\/)/g, `$1="${ORIGIN}/`)
      .replace(/(\ssrcset)="([^"]+)"/g, (_m, attr, value) => {
        const fixed = value.replace(/(^|,\s*)\/(?!\/)/g, `$1${ORIGIN}/`)
        return `${attr}="${fixed}"`
      })

    // FAQPage em JSON-LD, montado a partir das perguntas que acabamos de ler
    // da própria página — assim nunca sai de sincronia com src/data/site.ts.
    // É o que faz o Google mostrar as perguntas direto no resultado de busca
    // e o que as IAs leem primeiro quando resumem o site.
    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqAnswers
        .filter((f) => f.question && f.text)
        .map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.text },
        })),
    }

    const faqTag =
      '    <script type="application/ld+json" data-generated="prerender">\n' +
      JSON.stringify(faqJsonLd, null, 2)
        .split('\n')
        .map((l) => '      ' + l)
        .join('\n') +
      '\n    </' + 'script>\n'

    /** Insere (ou substitui) o bloco gerado logo antes de </head>. */
    const withFaq = (doc) =>
      doc
        .replace(
          /[ \t]*<script type="application\/ld\+json" data-generated="prerender">[\s\S]*?<\/script>\n?/,
          '',
        )
        .replace('</head>', faqTag + '  </head>')

    const note =
      '<!-- Versão pré-renderizada para buscadores e assistentes de IA.\n' +
      '     Mesmo conteúdo do site, com o HTML já preenchido.\n' +
      `     Gerada automaticamente por scripts/prerender.mjs em ${new Date().toISOString()}. -->\n`

    await writeFile(join(DIST, 'prerender.html'), note + withFaq(absolute), 'utf8')

    // O mesmo JSON-LD vale para quem visita o site normal: o Google lê os
    // dados estruturados do index.html sem precisar renderizar nada.
    const indexPath = join(DIST, 'index.html')
    await writeFile(indexPath, withFaq(await readFile(indexPath, 'utf8')), 'utf8')

    const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim())
    console.log(
      `[prerender] dist/prerender.html — ${(Buffer.byteLength(absolute) / 1024).toFixed(0)} kB, ` +
        `${text.split(' ').length} palavras de texto legível sem JavaScript.`,
    )
  } catch (err) {
    console.warn('[prerender] falhou:', err.message)
    console.warn('[prerender] o build segue; só a versão para robôs não foi gerada.')
  } finally {
    await browser?.close()
    server.close()
  }
}

await main()
