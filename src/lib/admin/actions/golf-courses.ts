"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteObject } from "@/lib/r2/delete";
import { keyFromPublicUrl } from "@/lib/r2/urls";

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function nullableStr(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value.length > 0 ? value : null;
}

function fieldsFromForm(formData: FormData) {
  return {
    display_order: Number(formData.get("display_order") ?? 0) || 0,
    featured_on_home: formData.get("featured_on_home") === "on",
    name_vi: str(formData, "name_vi"),
    name_kr: str(formData, "name_kr"),
    location_vi: str(formData, "location_vi"),
    location_kr: str(formData, "location_kr"),
    distance_vi: str(formData, "distance_vi"),
    distance_kr: str(formData, "distance_kr"),
    distance_from_homestay_vi: nullableStr(formData, "distance_from_homestay_vi"),
    distance_from_homestay_kr: nullableStr(formData, "distance_from_homestay_kr"),
    holes_vi: str(formData, "holes_vi"),
    holes_kr: str(formData, "holes_kr"),
    highlight_vi: str(formData, "highlight_vi"),
    highlight_kr: str(formData, "highlight_kr"),
    text_vi: str(formData, "text_vi"),
    text_kr: str(formData, "text_kr"),
    details_vi: linesToArray(formData.get("details_vi")),
    details_kr: linesToArray(formData.get("details_kr")),
    images: formData.getAll("images").map(String).filter(Boolean),
    video_url: nullableStr(formData, "video_url"),
  };
}

async function revalidateCourse(slug: string, featuredOnHome: boolean) {
  revalidatePath("/golf");
  revalidatePath(`/golf/${slug}`);
  if (featuredOnHome) revalidatePath("/");
}

export async function createGolfCourse(formData: FormData) {
  await requireAdminUser();

  const slug = str(formData, "slug");
  if (!slug) throw new Error("Slug is required");

  const supabase = await createClient();
  const { error } = await supabase
    .from("golf_courses")
    .insert({ slug, ...fieldsFromForm(formData) });

  if (error) throw new Error(error.message);

  await revalidateCourse(slug, formData.get("featured_on_home") === "on");
  redirect("/admin/courses");
}

export async function updateGolfCourse(id: string, formData: FormData) {
  await requireAdminUser();

  const slug = str(formData, "slug");
  const supabase = await createClient();
  const { error } = await supabase
    .from("golf_courses")
    .update({ ...fieldsFromForm(formData), updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  await revalidateCourse(slug, formData.get("featured_on_home") === "on");
  redirect("/admin/courses");
}

async function deleteR2ObjectsFor(images: string[], videoUrl: string | null) {
  const keys = [...images, videoUrl]
    .filter((url): url is string => Boolean(url))
    .map((url) => keyFromPublicUrl(url))
    .filter((key): key is string => Boolean(key));

  await Promise.allSettled(keys.map((key) => deleteObject(key)));
}

export async function deleteGolfCourse(id: string, slug: string, featuredOnHome: boolean) {
  await requireAdminUser();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("golf_courses")
    .delete()
    .eq("id", id)
    .select("images, video_url")
    .single();

  if (error) throw new Error(error.message);

  await deleteR2ObjectsFor(data?.images ?? [], data?.video_url ?? null);

  await revalidateCourse(slug, featuredOnHome);
  redirect("/admin/courses");
}
