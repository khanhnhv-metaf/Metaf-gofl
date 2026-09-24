"use client";

import ContactForm from "./ContactForm";
import ContactChannelIcon from "./ContactChannelIcon";
import { useLanguage } from "./LanguageProvider";

const FACEBOOK_URL = "https://www.facebook.com/share/1BwP6tDXbg/";

function getChannelHref(key: string, value: string | null): string | null {
  if (!value) return null;
  switch (key) {
    case "email":
      return `mailto:${value}`;
    case "zalo":
      return `https://zalo.me/${value.replace(/^0/, "84")}`;
    case "telegram":
      return `https://t.me/${value.replace(/^@/, "")}`;
    case "facebook":
      return FACEBOOK_URL;
    default:
      return null;
  }
}

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <section id="contact" className="border-t border-line bg-surface py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <p className="section-eyebrow-lg">{c.eyebrow}</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-fairway-2 md:text-2xl">
            {c.title}
          </h2>
          <p className="mt-3 max-w-md text-lg text-ink-soft md:text-xl">{c.lead}</p>
          <ul className="mt-5 grid gap-2 text-base text-ink-soft">
            {c.points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-jade" /> {point}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <span className="block text-base font-semibold text-fairway-2">
              {c.channelsTitle}
            </span>
            <dl className="mt-3 grid gap-3">
              {c.channels.map((channel) => {
                if (channel.key === "phone" && channel.value) {
                  const lines = channel.value.split("\n");
                  return (
                    <div
                      key={channel.key}
                      className="flex items-start gap-3 text-base"
                    >
                      <ContactChannelIcon channelKey={channel.key} />
                      <div>
                        <dt className="font-medium text-ink">{channel.label}</dt>
                        <dd className="text-ink-soft">
                          {lines.map((line) => {
                            const tel = line
                              .replace(/^[^:]*:\s*/, "")
                              .replace(/[^\d+]/g, "");
                            return (
                              <a
                                key={line}
                                href={`tel:${tel}`}
                                className="block hover:text-fairway-2 hover:underline"
                              >
                                {line}
                              </a>
                            );
                          })}
                        </dd>
                      </div>
                    </div>
                  );
                }

                const href = getChannelHref(channel.key, channel.value);
                const Wrapper = href ? "a" : "div";
                return (
                  <Wrapper
                    key={channel.key}
                    {...(href
                      ? {
                          href,
                          target: href.startsWith("http") ? "_blank" : undefined,
                          rel: href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined,
                        }
                      : {})}
                    className={`flex items-center gap-3 rounded-lg text-base ${
                      href ? "-m-1.5 p-1.5 transition hover:bg-background" : ""
                    }`}
                  >
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
                  </Wrapper>
                );
              })}
            </dl>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
