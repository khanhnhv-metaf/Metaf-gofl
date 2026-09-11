import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

// The authoritative admin check — src/proxy.ts only does a fast, optimistic
// redirect based on cookie presence; this is what actually verifies the
// session against Supabase Auth. Call it at the top of every /admin Server
// Component AND independently inside every admin Server Action (Server
// Actions must authorize themselves like public endpoints).
export const requireAdminUser = cache(async (): Promise<User> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
});

export const getAdminUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
