"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import roomImage from "@/app/asset/bedroom.jpg";
import outdoorImage from "@/app/asset/outdoor.jpg";
import massageImage from "@/app/asset/massage-room.jpg";

export default function Destination() {
  const { t } = useLanguage();
  const d = t.destination;

  return (
    <section id="destination" className="border-t border-line bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="section-eyebrow">{d.eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl font-semibold text-fairway-2 md:text-5xl">
          {d.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">{d.lead}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-2xl">
              <Image
                src={roomImage}
                alt="Phòng nghỉ phong cách villa tại khu nghỉ dưỡng Sóc Sơn"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={outdoorImage}
                alt="Không gian ngoài trời tại khu nghỉ dưỡng Sóc Sơn"
                fill
                sizes="(max-width: 1024px) 50vw, 27vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={massageImage}
                alt="Phòng massage & thư giãn tại khu nghỉ dưỡng Sóc Sơn"
                fill
                sizes="(max-width: 1024px) 50vw, 27vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <ul className="grid gap-4">
              {d.features.map((f) => (
                <li
                  key={f.label}
                  className="rounded-xl border border-line bg-surface p-4"
                >
                  <span className="block text-lg font-semibold text-fairway-2">
                    {f.label}
                  </span>
                  <span className="text-base text-ink-soft">{f.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 overflow-hidden rounded-xl border border-line">
              <iframe
                src="https://www.google.com/maps?q=21.2849442,105.7902559&z=15&output=embed"
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Zen Homestay Lâm Trường"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
