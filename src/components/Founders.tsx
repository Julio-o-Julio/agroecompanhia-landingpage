import { MessageCircle } from "lucide-react";
import { FOUNDERS, WHATSAPP, MESSAGES, whatsLink } from "../data/site";
import { Reveal } from "./ui/Reveal";

export function Founders() {
  return (
    <section id="socios" className="scroll-mt-24 bg-ink-900 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display text-sm font-bold tracking-[0.22em] text-gold-700 uppercase">
            Quem somos
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.3rem)] font-extrabold">
            Aqui você fala com o dono. Sempre falou.
          </h2>
          <p className="mt-5 text-lg text-steel-300">
            Uma oficina em Santa Helena — PR e mais de duas décadas de mão em
            colheitadeira. Quem atende no WhatsApp é a mesma pessoa que solda a
            peça.
          </p>
        </Reveal>

        <div
          className={`mt-14 grid gap-6 md:gap-8 ${
            FOUNDERS.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-sm"
          }`}
        >
          {FOUNDERS.map((founder, i) => {
            const contact =
              WHATSAPP.find((w) => w.id === founder.whatsId) ?? WHATSAPP[0];
            return (
              <Reveal key={founder.name} delay={i * 0.08} as="article">
                <div className="group h-full overflow-hidden rounded-2xl border border-ink-700 bg-ink-850 transition-colors duration-300 hover:border-gold-400/35">
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink-800">
                    <img
                      src={founder.photo}
                      alt={`Retrato de ${founder.name}, ${founder.role}`}
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-6 text-center md:p-7">
                    <h3 className="font-display text-xl font-extrabold text-steel-100">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-sm text-gold-700">{founder.role}</p>
                    <p className="mt-0.5 text-sm text-steel-400">
                      {founder.base}
                    </p>

                    <a
                      href={whatsLink(contact, MESSAGES.hero)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-ink-600 px-4 text-sm font-semibold text-steel-100 transition-colors duration-200 hover:border-gold-400/60 hover:text-gold-700"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      Falar com {founder.name.split(" ")[0]} — {contact.display}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
