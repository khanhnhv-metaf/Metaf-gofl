"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { toLangGolfCourse } from "@/lib/data/types";
import type { GolfCourseRow } from "@/lib/data/types";

export default function GolfCourses({ courses }: { courses: GolfCourseRow[] }) {
  const { t, lang } = useLanguage();
  const g = t.golf;

  return (
    <section id="golf" className="border-t border-line bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="section-eyebrow">{g.eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-fairway-2">
          {g.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">{g.lead}</p>
        <Link
          href="/golf"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brass hover:opacity-80"
        >
          {g.viewAllCta}
          <span aria-hidden>→</span>
        </Link>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {courses.map((row) => {
            const c = toLangGolfCourse(row, lang);
            return (
              <article
                key={c.slug}
                className="overflow-hidden rounded-2xl border border-line bg-background"
              >
                <Link href={`/golf/${c.slug}`} className="relative block aspect-[3/2]">
                  {c.images[0] && (
                    <Image
                      src={c.images[0]}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 hover:scale-105"
                    />
                  )}
                  <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                    {c.distanceFromHomestay ?? c.distance}
                  </span>
                </Link>
                <div className="p-5">
                  <h3 className="font-display text-2xl font-semibold text-fairway-2">
                    <Link href={`/golf/${c.slug}`} className="hover:underline">
                      {c.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-base text-ink-soft">{c.text}</p>
                  <span className="mt-3 inline-block rounded-full bg-jade/15 px-3 py-1 text-xs font-semibold text-jade">
                    {c.highlight}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
