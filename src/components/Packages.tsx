"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { IMAGES } from "@/lib/images";

const PACKAGE_IMAGES = [IMAGES.packages[0], IMAGES.packages[1], IMAGES.packages[2]];

export default function Packages() {
  const { t } = useLanguage();
  const p = t.packages;

  return (
    <section id="packages" className="border-t border-line bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="section-eyebrow">{p.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-fairway-2">
          {p.title}
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{p.lead}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {p.items.map((item, i) => (
            <article
              key={item.name}
              className={`overflow-hidden rounded-2xl border bg-surface ${
                item.featured
                  ? "border-brass shadow-lg shadow-brass/10"
                  : "border-line"
              }`}
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={PACKAGE_IMAGES[i % PACKAGE_IMAGES.length]}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <span className="section-eyebrow">{item.tag}</span>
                <h3 className="mt-1 font-display text-xl font-semibold text-fairway-2">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{item.text}</p>
                <ul className="mt-3 grid gap-1.5">
                  {item.includes.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-start gap-2 text-sm text-ink-soft"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jade" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
