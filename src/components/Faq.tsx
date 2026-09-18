"use client";

import { useLanguage } from "./LanguageProvider";

export default function Faq() {
  const { t } = useLanguage();
  const f = t.faq;

  return (
    <section id="faq" className="border-t border-line bg-background py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="section-eyebrow-lg">{f.eyebrow}</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-fairway-2 md:text-2xl">
          {f.title}
        </h2>

        <div className="mt-8 grid gap-3">
          {f.items.map((item, i) => (
            <details
              key={item.q}
              className="group rounded-xl border border-line bg-surface p-5 open:border-brass"
              open={i === 0}
            >
              <summary className="cursor-pointer list-none text-xl font-semibold text-fairway-2 marker:content-none">
                {item.q}
              </summary>
              <p className="mt-3 text-lg text-ink-soft md:text-xl">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
