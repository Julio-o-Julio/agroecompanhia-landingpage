/**
 * Fonte única de conteúdo da landing page.
 * Tudo que o cliente vai querer trocar (textos, números, fotos) mora aqui.
 *
 * ⚠️ Itens marcados com PLACEHOLDER são fictícios e PRECISAM ser substituídos
 *    por dados reais antes de publicar.
 */

import { asset } from '../lib/asset'

export const CONTACTS = {
  instagram: 'https://instagram.com/agroecompanhia',
  instagramHandle: '@agroecompanhia',
  city: 'Santa Helena',
  state: 'PR',
} as const

export type WhatsContact = {
  id: string
  label: string
  region: string
  display: string
  e164: string
}

export const WHATSAPP: WhatsContact[] = [
  {
    id: 'sul',
    label: 'Matriz — Sul',
    region: 'Paraná, Santa Catarina e Rio Grande do Sul',
    display: '(45) 98820-8668',
    e164: '5545988208668',
  },
  {
    id: 'centro-oeste',
    label: 'Atendimento — Centro-Oeste e Bahia',
    region: 'Mato Grosso, Goiás, Mato Grosso do Sul e Oeste da Bahia',
    display: '(77) 99877-6858',
    e164: '5577998776858',
  },
]

export const DEFAULT_WHATS = WHATSAPP[0]

export function whatsLink(contact: WhatsContact, message: string) {
  return `https://wa.me/${contact.e164}?text=${encodeURIComponent(message)}`
}

export const MESSAGES = {
  hero: 'Olá! Vim pelo site da Agro & Companhia e quero falar sobre os equipamentos.',
  modulo:
    'Olá! Quero um orçamento do Módulo Agressivo para plataforma Draper. Minha plataforma é: ',
  caixa: 'Olá! Quero um orçamento da Caixa Organizadora. Minha colheitadeira é: ',
  suporte: 'Olá! Preciso de suporte técnico da Agro & Companhia.',
}

/* ------------------------------------------------------------------ */
/* Números / provas                                                     */
/* ------------------------------------------------------------------ */

export const STATS = [
  { value: 20, suffix: '+', label: 'anos de oficina', hint: 'Desde 2004 no agro' },
  { value: 500, suffix: '+', label: 'plataformas atendidas', hint: 'PLACEHOLDER — confirmar' },
  { value: 7, suffix: '', label: 'estados atendidos', hint: 'Sul, Centro-Oeste e Bahia' },
  { value: 100, suffix: '%', label: 'fabricação própria', hint: 'Projeto, corte e solda em casa' },
]

/* ------------------------------------------------------------------ */
/* Produtos                                                             */
/* ------------------------------------------------------------------ */

export type ProductImage = {
  src: string
  srcSet: string
  thumb: string
  alt: string
}

/**
 * Monta as três versões de uma foto de produto a partir do nome-base.
 *
 * As fotos vivem em `public/images/products/`. Junto de cada `.jpeg` original
 * ficam os derivados `-720`, `-1152` (o que o navegador escolhe pelo `srcSet`)
 * e `-200` (miniatura). Para adicionar uma foto nova: jogue o arquivo na
 * pasta, gere os derivados e acrescente uma linha em `images` abaixo — a
 * primeira da lista é a que abre o carrossel.
 */
function photo(base: string, alt: string): ProductImage {
  const url = (suffix: string) => asset(`/images/products/${base}-${suffix}.webp`)
  return {
    src: url('1152'),
    srcSet: `${url('720')} 720w, ${url('1152')} 1152w`,
    thumb: url('200'),
    alt,
  }
}

export type Product = {
  id: string
  eyebrow: string
  name: string
  /** artigo para concordância no CTA: "Orçamento do/da <nome>" */
  article: 'do' | 'da'
  tagline: string
  description: string
  images: ProductImage[]
  badge: string
  bullets: { title: string; text: string }[]
  specs: { label: string; value: string }[]
  whatsMessage: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'modulo-agressivo',
    eyebrow: 'Produto 01',
    name: 'Módulo Agressivo',
    article: 'do',
    tagline: 'Plataforma Draper que engole a lavoura sem engasgar.',
    description:
      'Uma evolução completa no sistema de alimentação da plataforma Draper. O módulo agressivo aumenta o poder de arraste do material para o canal do alimentador, elimina o acúmulo no centro da plataforma e mantém o fluxo constante mesmo em soja alta, palhada pesada ou lavoura deitada.',
    images: [
      // Imagem de campo gerada por IA (o restante são fotos reais da peça).
      photo(
        'foto-modulo-campo',
        'Módulo agressivo da Agro & Companhia apoiado na lavoura ao entardecer, visto de frente pelo flange de fixação parafusado, com a hélice recortada ao fundo',
      ),
      photo(
        'foto-modulo-perspectiva',
        'Módulo agressivo da Agro & Companhia em vista de três-quartos, mostrando as duas hélices recortadas soldadas ao tubo central',
      ),
      photo(
        'foto-modulo-lateral',
        'Vista lateral do módulo agressivo, com as hélices em posições opostas ao longo do tubo',
      ),
      photo(
        'foto-modulo-angulos',
        'Composição com quatro ângulos do módulo agressivo: laterais e vistas em perspectiva das duas extremidades',
      ),
    ],
    badge: 'Evolução do sistema de alimentação',
    bullets: [
      {
        title: 'Fluxo contínuo, sem embuchamento',
        text: 'Geometria agressiva puxa o material para o canal e acaba com a parada para desembuchar.',
      },
      {
        title: 'Menos perda na plataforma',
        text: 'O material entra inteiro e alinhado, reduzindo debulha na frente e grão jogado no chão.',
      },
      {
        title: 'Mais velocidade de colheita',
        text: 'Com alimentação estável dá para manter o ritmo sem sacrificar a qualidade da massa.',
      },
      {
        title: 'Instalação sem adaptação improvisada',
        text: 'Fixação nos pontos originais da plataforma. Sai e volta sem furar nada fora do projeto.',
      },
    ],
    specs: [
      { label: 'Aplicação', value: 'Plataforma Draper' },
      { label: 'Marcas', value: 'John Deere 600/700 · GTS · CNH' },
      { label: 'Material', value: 'Aço de alta resistência' },
      { label: 'Instalação', value: 'Pontos originais, sem corte' },
    ],
    whatsMessage: MESSAGES.modulo,
  },
  {
    id: 'caixa-organizadora',
    eyebrow: 'Produto 02',
    name: 'Caixa Organizadora',
    article: 'da',
    tagline: 'A única do mercado brasileiro. E a colheita agradece.',
    description:
      'Ferramenta, peça de reposição e miudeza cada uma no seu lugar, dentro da máquina, ao alcance da mão. Projetada para o dia a dia da colheita: chuva, poeira, trepidação e pressa. Nasceu de 20 anos vendo operador perder hora procurando chave de 19 no meio do talhão.',
    images: [
      photo(
        'foto-varias-caixas-zero',
        'Caixas organizadoras da Agro & Companhia empilhadas, prontas para entrega',
      ),
      photo(
        'foto-caixa-aberta',
        'Caixa organizadora aberta, mostrando as divisórias internas e a tampa com a marca Agro & Companhia',
      ),
      photo(
        'foto-uma-caixa',
        'Caixa organizadora fechada, com a superfície antiderrapante e a plaqueta de identificação',
      ),
      photo(
        'foto-varias-caixas-2',
        'Detalhe da linha de fechos e plaquetas de várias caixas organizadoras enfileiradas',
      ),
      photo('foto-caixas', 'Lote de caixas organizadoras no pátio da fábrica, prontas para carregar'),
      photo('foto-varias-caixas', 'Caixas organizadoras alinhadas mostrando o acabamento da pintura'),
    ],
    badge: 'Produto exclusivo — único no Brasil',
    bullets: [
      {
        title: 'Exclusiva no mercado brasileiro',
        text: 'Desenvolvimento próprio da Agro & Companhia. Não existe similar de fábrica.',
      },
      {
        title: 'Cada coisa no seu lugar',
        text: 'Divisórias pensadas para ferramenta, peça de reposição e itens de manutenção rápida.',
      },
      {
        title: 'Aguenta o serviço',
        text: 'Estrutura reforçada e acabamento para resistir a poeira, chuva e trepidação de safra.',
      },
      {
        title: 'Menos parada boba',
        text: 'Manutenção rápida feita ali mesmo, sem voltar ao barracão atrás de ferramenta.',
      },
    ],
    specs: [
      { label: 'Aplicação', value: 'Colheitadeiras em geral' },
      { label: 'Fixação', value: 'Suporte dedicado' },
      { label: 'Material', value: 'Chapa tratada e pintada' },
      { label: 'Exclusividade', value: 'Desenvolvimento próprio' },
    ],
    whatsMessage: MESSAGES.caixa,
  },
]

/* ------------------------------------------------------------------ */
/* Diferenciais                                                         */
/* ------------------------------------------------------------------ */

export const DIFFERENTIALS = [
  {
    icon: 'wrench',
    title: 'Oficina antes de catálogo',
    text: 'Mais de 20 anos consertando colheitadeira de verdade. Os dois produtos nasceram de problema visto no talhão, não de reunião.',
  },
  {
    icon: 'lightbulb',
    title: 'Desenvolvimento próprio',
    text: 'Projeto, corte, solda e acabamento feitos por nós. Isso permite ajustar detalhe a pedido do cliente, sem depender de terceiros.',
  },
  {
    icon: 'shield',
    title: 'Peça que volta pra safra',
    text: 'Aço de alta resistência e acabamento pensado para durar a vida útil da plataforma, não uma safra.',
  },
  {
    icon: 'headset',
    title: 'Suporte com quem fabricou',
    text: 'Você fala direto com quem projetou e montou a peça. No WhatsApp, na safra, no domingo.',
  },
] as const

/* ------------------------------------------------------------------ */
/* Processo (seção animada com GSAP)                                    */
/* ------------------------------------------------------------------ */

export const PROCESS = [
  {
    step: '01',
    title: 'Diagnóstico',
    text: 'Você manda o modelo da plataforma e o problema pelo WhatsApp. A gente confirma a aplicação antes de qualquer orçamento.',
  },
  {
    step: '02',
    title: 'Projeto e fabricação',
    text: 'Corte, dobra, solda e montagem na nossa oficina em Santa Helena — PR. Cada conjunto conferido peça por peça.',
  },
  {
    step: '03',
    title: 'Entrega no Brasil',
    text: 'Envio para Sul, Centro-Oeste e Oeste da Bahia. Prazo combinado antes da safra, não durante.',
  },
  {
    step: '04',
    title: 'Instalação e acompanhamento',
    text: 'Instruções claras, suporte por vídeo e acompanhamento na primeira colheita com o equipamento.',
  },
] as const

/* ------------------------------------------------------------------ */
/* Compatibilidade                                                      */
/* ------------------------------------------------------------------ */

export const COMPATIBILITY = [
  { brand: 'John Deere', models: 'Série 600 e 700 — plataformas Draper' },
  { brand: 'GTS', models: 'Linha de plataformas Draper' },
  { brand: 'CNH', models: 'Case IH e New Holland — Draper' },
]

/* ------------------------------------------------------------------ */
/* Sócios — ⚠️ PLACEHOLDER: trocar nomes, cargos e fotos reais          */
/* ------------------------------------------------------------------ */

export const FOUNDERS = [
  {
    name: 'Nome do Sócio 1',
    role: 'Sócio-fundador · Produção e desenvolvimento',
    photo: asset('/images/socio-1.svg'),
    quote:
      'Se a peça não aguentar a safra inteira, ela não sai daqui. É simples assim: o nome da gente vai junto com ela.',
    base: 'Santa Helena — PR',
    whatsId: 'sul',
  },
  {
    name: 'Nome do Sócio 2',
    role: 'Sócio · Comercial e assistência técnica',
    photo: asset('/images/socio-2.svg'),
    quote:
      'Atendo produtor no meio do talhão, de bota suja. Quem compra da gente fala com gente, não com atendente.',
    base: 'Centro-Oeste e Oeste da Bahia',
    whatsId: 'centro-oeste',
  },
] as const

/* ------------------------------------------------------------------ */
/* Depoimentos — ⚠️ PLACEHOLDER: 100% fictícios, substituir por reais   */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS = [
  {
    quote:
      'Colhi 1.400 hectares de soja sem parar uma vez para desembuchar a plataforma. Antes era duas, três paradas por dia.',
    name: 'Nome do cliente',
    role: 'Produtor · PLACEHOLDER',
    location: 'Oeste do Paraná',
  },
  {
    quote:
      'A caixa organizadora resolveu um problema que eu nem sabia que tinha. Hoje não sobe máquina nossa sem uma.',
    name: 'Nome do cliente',
    role: 'Prestador de serviço · PLACEHOLDER',
    location: 'Sorriso — MT',
  },
  {
    quote:
      'Revendo peça agrícola há 15 anos. O módulo é o item que mais volta cliente falando bem na loja.',
    name: 'Nome do cliente',
    role: 'Revenda de peças · PLACEHOLDER',
    location: 'Luís Eduardo Magalhães — BA',
  },
] as const

/* ------------------------------------------------------------------ */
/* Clientes — ⚠️ PLACEHOLDER: trocar por logos reais autorizadas        */
/* ------------------------------------------------------------------ */

export const CLIENTS = [
  'Fazenda Santa Clara',
  'Agrícola Vale Verde',
  'Colheitas do Cerrado',
  'Grupo Terra Boa',
  'Peças Agromaq',
  'Fazenda Três Irmãos',
  'Serv Colheita MT',
  'Agro Center Oeste',
] as const

/* ------------------------------------------------------------------ */
/* Cobertura                                                            */
/* ------------------------------------------------------------------ */

export const COVERAGE = {
  primary: ['PR', 'SC', 'RS', 'MT', 'MS', 'GO', 'BA'],
  regions: [
    { name: 'Sul', detail: 'Paraná, Santa Catarina e Rio Grande do Sul', contact: 'sul' },
    { name: 'Centro-Oeste', detail: 'Mato Grosso, Mato Grosso do Sul e Goiás', contact: 'centro-oeste' },
    { name: 'Oeste da Bahia', detail: 'Região de Luís Eduardo Magalhães e Barreiras', contact: 'centro-oeste' },
  ],
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

export const FAQ = [
  {
    q: 'O módulo agressivo serve na minha plataforma?',
    a: 'Ele é desenvolvido para plataformas Draper — John Deere série 600 e 700, GTS e CNH. Mande o modelo e o ano da sua plataforma no WhatsApp que a gente confirma a aplicação antes de fechar qualquer pedido.',
  },
  {
    q: 'A instalação precisa de oficina especializada?',
    a: 'Não. A fixação usa pontos originais da plataforma e enviamos as instruções junto com o conjunto. A maioria dos clientes instala com a própria equipe, e a gente acompanha por vídeo se precisar.',
  },
  {
    q: 'Instalar o módulo tira a garantia da colheitadeira?',
    a: 'O módulo substitui um componente do sistema de alimentação sem alterar estrutura ou eletrônica da máquina. Ainda assim, converse com a sua concessionária sobre as condições do seu contrato de garantia.',
  },
  {
    q: 'Vocês entregam em qual região?',
    a: 'Atendemos todo o Brasil, com presença mais forte no Sul, Centro-Oeste e Oeste da Bahia. Temos atendimento dedicado em cada uma dessas praças.',
  },
  {
    q: 'Trabalham com revendas de peças agrícolas?',
    a: 'Sim. Temos condição específica para revendas e prestadores de serviço de colheita que querem oferecer os dois produtos. Fale com o comercial pelo WhatsApp.',
  },
  {
    q: 'A caixa organizadora serve em qualquer colheitadeira?',
    a: 'Ela é fabricada com suporte dedicado e adaptamos a fixação conforme o modelo da máquina. Informe marca e modelo que confirmamos antes de produzir.',
  },
] as const

export const NAV = [
  { label: 'Produtos', href: '#produtos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Aplicações', href: '#aplicacoes' },
  { label: 'Quem somos', href: '#socios' },
  { label: 'Dúvidas', href: '#faq' },
] as const
