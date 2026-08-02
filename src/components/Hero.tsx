"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/gofl-bg.jpg"
          alt="Sân golf gần Zen Homestay Lâm Trường"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-40 text-white">
        <div className="flex flex-wrap gap-4">
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
