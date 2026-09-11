import { supabase } from "@/lib/supabaseClient";
import type { PackageRow } from "./types";

export async function getAllPackages(): Promise<PackageRow[]> {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getAllPackages:", error.message);
    return [];
  }
  return data ?? [];
}
