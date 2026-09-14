"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "./LanguageProvider";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    const { error } = await supabase.from("leads").insert({
      name: data.get("name"),
      contact_info: data.get("contactInfo"),
      package: data.get("package"),
      travel_date: data.get("date") || null,
      guests: Number(data.get("guests")) || null,
      note: data.get("note"),
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    form.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-line bg-surface p-6"
    >
      <div className="grid gap-1.5">
        <label htmlFor="name" className="text-lg font-medium">
          {f.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={f.namePlaceholder}
          className="rounded-lg border border-line bg-background px-3 py-2 text-lg outline-none focus:border-fairway-2"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="contactInfo" className="text-lg font-medium">
          {f.contactInfo}
        </label>
        <input
          id="contactInfo"
          name="contactInfo"
          type="text"
          required
          placeholder={f.contactInfoPlaceholder}
          className="rounded-lg border border-line bg-background px-3 py-2 text-lg outline-none focus:border-fairway-2"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="package" className="text-lg font-medium">
          {f.packageLabel}
        </label>
        <select
          id="package"
          name="package"
          className="rounded-lg border border-line bg-background px-3 py-2 text-lg outline-none focus:border-fairway-2"
        >
          {f.packageOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="date" className="text-lg font-medium">
          {f.date}
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="rounded-lg border border-line bg-background px-3 py-2 text-lg outline-none focus:border-fairway-2"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="guests" className="text-lg font-medium">
          {f.guests}
        </label>
        <input
          id="guests"
          name="guests"
          type="number"
          min={1}
          defaultValue={2}
          className="rounded-lg border border-line bg-background px-3 py-2 text-lg outline-none focus:border-fairway-2"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="note" className="text-lg font-medium">
          {f.note}
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder={f.notePlaceholder}
          className="rounded-lg border border-line bg-background px-3 py-2 text-lg outline-none focus:border-fairway-2"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-brass px-6 py-3 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? f.submitting : f.submit}
      </button>

      {status === "success" && (
        <p className="text-lg font-medium text-fairway-2">{f.success}</p>
      )}
      {status === "error" && (
        <p className="text-lg font-medium text-red-600">{f.error}</p>
      )}
    </form>
  );
}
