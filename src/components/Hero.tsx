"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { IMAGES } from "@/lib/images";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroResort}
          alt="Không gian nghỉ dưỡng tại khu vực Sóc Sơn, Hà Nội"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-40 text-white">
        <p className="section-eyebrow text-brass-soft">{t.hero.eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight md:text-5xl">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-xl text-white/85">{t.hero.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-brass px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#golf"
            className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {t.hero.ctaGhost}
          </a>
        </div>
      </div>
    </section>
  );
}
