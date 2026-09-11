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

function fieldsFromForm(formData: FormData) {
  const image = str(formData, "image_url");
  return {
    display_order: Number(formData.get("display_order") ?? 0) || 0,
    featured: formData.get("featured") === "on",
    flight_included: formData.get("flight_included") === "on",
    tag_vi: str(formData, "tag_vi"),
    tag_kr: str(formData, "tag_kr"),
    name_vi: str(formData, "name_vi"),
    name_kr: str(formData, "name_kr"),
    text_vi: str(formData, "text_vi"),
    text_kr: str(formData, "text_kr"),
    includes_vi: linesToArray(formData.get("includes_vi")),
    includes_kr: linesToArray(formData.get("includes_kr")),
    image_url: image.length > 0 ? image : null,
  };
}

export async function createPackage(formData: FormData) {
  await requireAdminUser();

  const slug = str(formData, "slug");
  if (!slug) throw new Error("Slug is required");

  const supabase = await createClient();
  const { error } = await supabase
    .from("packages")
    .insert({ slug, ...fieldsFromForm(formData) });

  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/admin/packages");
}

export async function updatePackage(id: string, formData: FormData) {
  await requireAdminUser();

  const supabase = await createClient();
  const { error } = await supabase
    .from("packages")
    .update({ ...fieldsFromForm(formData), updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/admin/packages");
}

export async function deletePackage(id: string) {
  await requireAdminUser();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .delete()
    .eq("id", id)
    .select("image_url")
    .single();

  if (error) throw new Error(error.message);

  const key = data?.image_url ? keyFromPublicUrl(data.image_url) : null;
  if (key) await deleteObject(key).catch(() => {});

  revalidatePath("/");
  redirect("/admin/packages");
}
