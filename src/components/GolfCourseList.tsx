"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { toLangGolfCourse } from "@/lib/data/types";
import type { GolfCourseRow } from "@/lib/data/types";

export default function GolfCourseList({ courses }: { courses: GolfCourseRow[] }) {
  const { t, lang } = useLanguage();
  const g = t.golfList;

  return (
    <section className="border-t border-line bg-background py-16">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/"
          className="text-lg font-medium text-ink-soft hover:text-fairway-2"
        >
          {g.backHome}
        </Link>

        <p className="section-eyebrow mt-4">{g.eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-fairway-2 md:text-4xl">
          {g.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">{g.lead}</p>

        <div className="mt-10 grid gap-6">
          {courses.map((row) => {
            const course = toLangGolfCourse(row, lang);
            return (
              <article
                key={course.slug}
                className="grid gap-0 overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-[1.1fr_1.4fr]"
              >
                <Link
                  href={`/golf/${course.slug}`}
                  className="relative block aspect-[3/2] md:aspect-auto"
                >
                  {course.images[0] && (
                    <Image
                      src={course.images[0]}
                      alt={course.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition duration-300 hover:scale-105"
                    />
                  )}
                </Link>

                <div className="flex flex-col justify-between p-6">
                  <div>
                    <span className="inline-block rounded-full bg-jade/15 px-3 py-1 text-lg font-semibold text-jade">
                      {course.highlight}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-fairway-2">
                      <Link href={`/golf/${course.slug}`} className="hover:underline">
                        {course.name}
                      </Link>
                    </h2>
                    <dl className="mt-3 grid grid-cols-1 gap-1.5 text-lg text-ink-soft sm:grid-cols-2">
                      <div>
                        <dt className="font-medium text-ink">{course.location}</dt>
                      </div>
                      <div>
                        <dd>{course.distance}</dd>
                      </div>
                      <div>
                        <dd>{course.holes}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-lg text-ink-soft">{course.text}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <div>
                      <span className="block text-lg uppercase tracking-wide text-ink-soft">
                        {g.priceLabel}
                      </span>
                      <span className="font-display text-xl text-fairway-2">
                        {g.pricePlaceholder}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/golf/${course.slug}`}
                        className="rounded-full border border-fairway-2 px-5 py-2.5 text-lg font-semibold text-fairway-2 transition hover:bg-fairway-2 hover:text-white"
                      >
                        {g.detailCta}
                      </Link>
                      <Link
                        href="/#contact"
                        className="rounded-full bg-brass px-5 py-2.5 text-lg font-semibold text-white transition hover:opacity-90"
                      >
                        {g.contactCta}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
