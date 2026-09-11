type ChannelKey = "kakaotalk" | "telegram" | "zalo" | "facebook" | "email" | "phone";

function Badge({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${className}`}
    >
      {children}
    </span>
  );
}

const ICONS: Record<ChannelKey, React.ReactNode> = {
  kakaotalk: (
    <Badge className="bg-[#FEE500]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#391B1B" aria-hidden="true">
        <path d="M12 4.5C6.9 4.5 2.8 7.7 2.8 11.6c0 2.5 1.6 4.7 4 6l-1 3.6c-.1.4.3.7.7.5l4.2-2.3c.4 0 .9.1 1.3.1 5.1 0 9.2-3.2 9.2-7.9S17.1 4.5 12 4.5Z" />
      </svg>
    </Badge>
  ),
  telegram: (
    <Badge className="bg-[#26A5E4]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden="true">
        <path d="M21.5 4.5 2.7 12c-.8.3-.8 1.5 0 1.8l4.6 1.5 1.8 5.6c.2.7 1.1.9 1.6.3l2.5-2.9 4.8 3.5c.6.5 1.6.1 1.8-.6l3.3-15.4c.2-.9-.7-1.6-1.5-1.3ZM8.8 14.9l8.6-6.5c.3-.2.6.2.3.4l-7 6.4-.3 3.1-1.6-3.4Z" />
      </svg>
    </Badge>
  ),
  zalo: (
    <Badge className="bg-[#0068FF]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden="true">
        <path d="M12 3C6.9 3 2.8 6.6 2.8 11c0 2.4 1.2 4.5 3.1 6l-.8 3.4a.6.6 0 0 0 .9.7l3.8-2.1c.7.1 1.4.2 2.2.2 5.1 0 9.2-3.6 9.2-8S17.1 3 12 3Z" />
      </svg>
    </Badge>
  ),
  facebook: (
    <Badge className="bg-[#1877F2]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden="true">
        <path d="M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.9.3-1.5 1.6-1.5H16.5V4.2C16.2 4.1 15.2 4 14 4c-2.5 0-4.2 1.5-4.2 4.3V10.5H7.3v3H9.8V21h3.7Z" />
      </svg>
    </Badge>
  ),
  email: (
    <Badge className="bg-fairway-2">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden="true">
        <path d="M3.5 5A1.5 1.5 0 0 0 2 6.5v11A1.5 1.5 0 0 0 3.5 19h17a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 20.5 5h-17Zm.4 2h16.2L12 12.5 3.9 7Zm-.4 1.7 8.06 5.86a1 1 0 0 0 1.18 0L20.5 8.7V17h-17V8.7Z" />
      </svg>
    </Badge>
  ),
  phone: (
    <Badge className="bg-brass">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff" aria-hidden="true">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.3 1L6.6 10.8Z" />
      </svg>
    </Badge>
  ),
};

export default function ContactChannelIcon({ channelKey }: { channelKey: ChannelKey }) {
  return ICONS[channelKey];
}
