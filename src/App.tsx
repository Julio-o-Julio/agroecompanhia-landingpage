import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from './lib/motion'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { Products } from './components/Products'
import { Differentials } from './components/Differentials'
import { SHOW_SOCIAL_PROOF } from './data/site'

/* Tudo abaixo da dobra entra por code-splitting: o bundle inicial fica enxuto. */
const Process = lazy(() => import('./components/Process').then((m) => ({ default: m.Process })))
const Coverage = lazy(() => import('./components/Coverage').then((m) => ({ default: m.Coverage })))
const Founders = lazy(() => import('./components/Founders').then((m) => ({ default: m.Founders })))
const Testimonials = lazy(() =>
  import('./components/Testimonials').then((m) => ({ default: m.Testimonials })),
)
const Faq = lazy(() => import('./components/Faq').then((m) => ({ default: m.Faq })))
const CtaContact = lazy(() =>
  import('./components/CtaContact').then((m) => ({ default: m.CtaContact })),
)
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })))
const FloatingWhats = lazy(() =>
  import('./components/FloatingWhats').then((m) => ({ default: m.FloatingWhats })),
)

/** Espaço reservado enquanto o chunk carrega — evita layout shift (CLS). */
function SectionFallback({ className = 'min-h-[60vh]' }: { className?: string }) {
  return <div className={className} aria-hidden="true" />
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Header />
      <main id="conteudo">
        <Hero />
        <TrustBar />
        <Products />
        <Differentials />

        <Suspense fallback={<SectionFallback />}>
          <Process />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Coverage />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Founders />
        </Suspense>
        {/* fallback só reserva altura se a seção for de fato aparecer */}
        <Suspense fallback={SHOW_SOCIAL_PROOF ? <SectionFallback className="min-h-[50vh]" /> : null}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback className="min-h-[50vh]" />}>
          <Faq />
        </Suspense>
        <Suspense fallback={<SectionFallback className="min-h-[60vh]" />}>
          <CtaContact />
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback className="min-h-[20vh]" />}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingWhats />
      </Suspense>
    </LazyMotion>
  )
}
