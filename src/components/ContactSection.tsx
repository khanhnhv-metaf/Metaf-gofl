"use client";

import ContactForm from "./ContactForm";
import { useLanguage } from "./LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section id="contact" className="border-t border-line bg-surface py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <p className="section-eyebrow">{c.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-fairway-2">
            {c.title}
          </h2>
          <p className="mt-3 max-w-md text-ink-soft">{c.lead}</p>
          <ul className="mt-5 grid gap-2 text-sm text-ink-soft">
            {c.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-jade" /> {point}
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
