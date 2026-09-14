"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import aboutImage from "@/app/asset/outside2.jpg";

export default function AboutUs() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className="border-t border-line bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="section-eyebrow">{a.eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl font-semibold text-fairway-2 md:text-5xl">
          {a.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">{a.lead}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={aboutImage}
              alt={a.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {a.values.map((v) => (
              <li
                key={v.label}
                className="rounded-xl border border-line bg-surface p-4"
              >
                <span className="block text-xl font-semibold text-fairway-2 md:text-2xl">
                  {v.label}
                </span>
                <span className="text-lg text-ink-soft md:text-xl">{v.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
