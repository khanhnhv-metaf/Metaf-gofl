"use client";

import { useLanguage } from "./LanguageProvider";

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-display text-lg text-fairway-2">
            禅 Zen Homestay Lâm Trường
          </span>
          <p>{t.footer.address}</p>
        </div>
        <p>{t.footer.note}</p>
      </div>
    </footer>
  );
}
