"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        {!videoFailed && (
          <video
            className="h-full w-full object-cover"
            src="/hero-bg.mp4"
            poster="/gofl-bg.jpg"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
          />
        )}
        {videoFailed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/gofl-bg.jpg"
            alt="Sân golf gần Zen Homestay Lâm Trường"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-40 text-white">
        <p className="section-eyebrow text-white/90">{t.hero.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold md:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
          {t.hero.subtitle}
        </p>

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
