"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { IMAGES } from "@/lib/images";

const GALLERY_IMAGES = [
  IMAGES.heroResort,
  IMAGES.rooms[0],
  IMAGES.rooms[1],
  IMAGES.pool[0],
  IMAGES.pool[1],
  IMAGES.lobby[0],
  IMAGES.golf[0],
  IMAGES.golf[2],
  IMAGES.cafeBar[0],
  IMAGES.cafeBar[1],
  IMAGES.cafeBar[2],
  IMAGES.cafeBar[3],
];

export default function Gallery() {
  const { t } = useLanguage();
  const g = t.gallery;

  return (
    <section id="gallery" className="border-t border-line bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="section-eyebrow">{g.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-fairway-2">
          {g.title}
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GALLERY_IMAGES.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={src}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-soft">{g.note}</p>
      </div>
    </section>
  );
}
