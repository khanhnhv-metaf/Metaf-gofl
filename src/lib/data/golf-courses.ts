import { supabase } from "@/lib/supabaseClient";
import type { GolfCourseRow } from "./types";

export async function getAllGolfCourses(): Promise<GolfCourseRow[]> {
  const { data, error } = await supabase
    .from("golf_courses")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getAllGolfCourses:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedGolfCourses(): Promise<GolfCourseRow[]> {
  const { data, error } = await supabase
    .from("golf_courses")
    .select("*")
    .eq("featured_on_home", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("getFeaturedGolfCourses:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getGolfCourseBySlug(
  slug: string
): Promise<GolfCourseRow | null> {
  const { data, error } = await supabase
    .from("golf_courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getGolfCourseBySlug:", error.message);
    return null;
  }
  return data;
}

export async function getAllGolfCourseSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("golf_courses").select("slug");

  if (error) {
    console.error("getAllGolfCourseSlugs:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.slug as string);
}
