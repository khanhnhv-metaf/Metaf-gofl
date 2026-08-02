"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { getGolfCourseImages } from "@/lib/images";

export default function GolfCourseDetail({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const g = t.golfList;
  const course = g.courses.find((c) => c.slug === slug) ?? g.courses[0];
  const images = getGolfCourseImages(course.slug);
  const [cover, ...rest] = images;

  return (
    <section className="border-t border-line bg-background py-16">
      <div className="mx-auto max-w-5xl px-6">
        <Link
          href="/golf"
          className="text-sm font-medium text-ink-soft hover:text-fairway-2"
        >
          {g.backList}
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="inline-block rounded-full bg-jade/15 px-3 py-1 text-xs font-semibold text-jade">
            {course.highlight}
          </span>
        </div>

        <h1 className="mt-3 font-display text-3xl font-semibold text-fairway-2 md:text-4xl">
          {course.name}
        </h1>
        <p className="mt-2 text-ink-soft">{course.location}</p>

        {cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={cover}
              alt={course.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-semibold text-fairway-2">
              {g.infoSectionTitle}
            </h2>

            <ul className="mt-3 grid gap-1.5 text-sm text-ink-soft">
              <li>
                <span className="font-medium text-ink">{g.locationLabel}: </span>
                {course.location}
              </li>
              <li>
                <span className="font-medium text-ink">{g.distanceLabel}: </span>
                {course.distance}
              </li>
              <li>
                <span className="font-medium text-ink">{g.holesLabel}: </span>
                {course.holes}
              </li>
            </ul>

            <p className="mt-4 text-ink-soft">{course.text}</p>

            <h3 className="mt-6 font-display text-lg font-semibold text-fairway-2">
              {g.facilitiesTitle}
            </h3>
            <ul className="mt-2 grid gap-1.5">
              {course.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jade" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <Link
              href="/#contact"
              className="block rounded-full bg-brass px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              {g.contactCta}
            </Link>
          </div>
        </div>

        {rest.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-semibold text-fairway-2">
              {g.gallerySectionTitle}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {rest.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <Image
                    src={src}
                    alt={course.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
