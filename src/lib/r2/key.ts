import "server-only";

import { randomUUID } from "node:crypto";

// The R2 bucket ("metaf-assets") is shared across multiple Metaf-* projects —
// every object this project writes lives under this prefix so it can't
// collide with or overwrite another project's files in the same bucket.
const PROJECT_PREFIX = "metaf-gofl";

const ALLOWED_FOLDERS = /^(golf|packages)\/[a-zA-Z0-9-]+$/;

export function sanitizeFilename(filename: string): string {
  const lower = filename.trim().toLowerCase();
  const safe = lower
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/[-.]+$/, "");
  const truncated = safe.slice(0, 100);
  return truncated.length > 0 ? truncated : "file";
}

/** folder must be "golf/<slug>" or "packages/<slug>" — rejects anything else
 * so an admin-authenticated upload can't write outside the expected prefixes.
 * The returned key is always namespaced under PROJECT_PREFIX. */
export function buildObjectKey(folder: string, filename: string): string {
  if (!ALLOWED_FOLDERS.test(folder)) {
    throw new Error(`Invalid upload folder: ${folder}`);
  }
  return `${PROJECT_PREFIX}/${folder}/${randomUUID()}-${sanitizeFilename(filename)}`;
}
