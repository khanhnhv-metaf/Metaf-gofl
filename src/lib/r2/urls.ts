import { requireClientEnv } from "@/lib/env";

// No "server-only" here — used from admin client components (MediaUploader)
// right after a direct browser-to-R2 upload, to build/parse the public URL.
function publicDomain(): string {
  return requireClientEnv(
    process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN,
    "NEXT_PUBLIC_R2_PUBLIC_DOMAIN"
  );
}

export function getPublicUrl(key: string): string {
  const encodedKey = key.split("/").map(encodeURIComponent).join("/");
  return `${publicDomain()}/${encodedKey}`;
}

export function keyFromPublicUrl(url: string): string | null {
  const domain = publicDomain();
  if (!url.startsWith(`${domain}/`)) return null;
  return decodeURIComponent(url.slice(domain.length + 1));
}
