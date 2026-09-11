export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// For NEXT_PUBLIC_* vars: Next.js only inlines `process.env.NEXT_PUBLIC_X` when
// the literal name appears directly in the source, not via a dynamic
// `process.env[name]` lookup. Callers must read the literal env var themselves
// and pass the value in here just for the fail-fast check + error message.
export function requireClientEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
