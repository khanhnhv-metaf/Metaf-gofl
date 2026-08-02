"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const NAV_ITEMS = [
    { href: "/#about", label: t.nav.about },
    { href: "/#destination", label: t.nav.destination },
    { href: "/golf", label: t.nav.golf },
    { href: "/#packages", label: t.nav.packages },
    { href: "/#gallery", label: t.nav.gallery },
    { href: "/#faq", label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-fairway font-display text-lg text-white">
            禅
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-fairway-2">
              Zen Homestay
            </span>
            <span className="block text-[0.68rem] tracking-wide text-ink-soft">
              Lâm Trường · Ba Vì
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-fairway-2">
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-brass px-4 py-2 text-white transition hover:opacity-90"
          >
            {t.nav.cta}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle lang={lang} setLang={setLang} />

          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-6 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-surface px-6 py-4 text-sm font-medium text-ink-soft md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brass px-4 py-2 text-center text-white"
          >
            {t.nav.cta}
          </Link>
        </nav>
      )}
    </header>
  );
}

function LanguageToggle({
  lang,
  setLang,
}: {
  lang: "vi" | "kr";
  setLang: (lang: "vi" | "kr") => void;
}) {
  return (
    <div
      role="group"
      aria-label="Chọn ngôn ngữ / 언어 선택"
      className="flex rounded-full border border-line bg-background p-0.5 text-xs font-semibold"
    >
      <button
        type="button"
        onClick={() => setLang("vi")}
        aria-pressed={lang === "vi"}
        className={`rounded-full px-3 py-1.5 transition ${
          lang === "vi" ? "bg-fairway text-white" : "text-ink-soft hover:text-fairway-2"
        }`}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => setLang("kr")}
        aria-pressed={lang === "kr"}
        className={`rounded-full px-3 py-1.5 transition ${
          lang === "kr" ? "bg-fairway text-white" : "text-ink-soft hover:text-fairway-2"
        }`}
      >
        KR
      </button>
    </div>
  );
}
