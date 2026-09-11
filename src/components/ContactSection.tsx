"use client";

import ContactForm from "./ContactForm";
import ContactChannelIcon from "./ContactChannelIcon";
import { useLanguage } from "./LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section id="contact" className="border-t border-line bg-surface py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <p className="section-eyebrow">{c.eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-fairway-2">
            {c.title}
          </h2>
          <p className="mt-3 max-w-md text-ink-soft">{c.lead}</p>
          <ul className="mt-5 grid gap-2 text-sm text-ink-soft">
            {c.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-jade" /> {point}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <span className="block text-sm font-semibold text-fairway-2">
              {c.channelsTitle}
            </span>
            <dl className="mt-3 grid gap-3">
              {c.channels.map((channel) => (
                <div key={channel.key} className="flex items-center gap-3 text-sm">
                  <ContactChannelIcon channelKey={channel.key} />
                  <div>
                    <dt className="font-medium text-ink">{channel.label}</dt>
                    <dd
                      className={
                        channel.value
                          ? "text-ink-soft"
                          : "italic text-ink-soft/70"
                      }
                    >
                      {channel.value ?? c.channelsPlaceholder}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
