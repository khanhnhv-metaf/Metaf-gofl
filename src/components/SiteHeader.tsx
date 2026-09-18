"use client";

import { useState } from "react";
import Image from "next/image";
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
    { href: "/#faq", label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-header">
      <div className="flex items-center justify-between gap-4 px-8 py-3 sm:px-16 md:px-24">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="Zen Homestay Lâm Trường"
            width={40}
            height={40}
            className="h-17 w-18 rounded-full"
          />
       
        </Link>

        <nav className="hidden items-center gap-7 text-xl font-medium text-white md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
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
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-6 bg-white" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/15 bg-header px-6 py-4 text-lg font-medium text-white md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 hover:text-white"
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
      className="flex rounded-full border border-white/25 bg-white/10 p-0.5 text-lg font-semibold"
    >
      <button
        type="button"
        onClick={() => setLang("vi")}
        aria-pressed={lang === "vi"}
        className={`rounded-full px-3 py-1.5 transition ${
          lang === "vi" ? "bg-white text-header" : "text-white hover:text-white"
        }`}
      >
        VI
      </button>
      <button
        type="button"
        onClick={() => setLang("kr")}
        aria-pressed={lang === "kr"}
        className={`rounded-full px-3 py-1.5 transition ${
          lang === "kr" ? "bg-white text-header" : "text-white hover:text-white"
        }`}
      >
        KR
      </button>
    </div>
  );
}
