import { notFound } from "next/navigation";
import PackageForm from "@/components/admin/PackageForm";
import { updatePackage } from "@/lib/admin/actions/packages";
import { createClient } from "@/lib/supabase/server";
import type { PackageRow } from "@/lib/data/types";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .maybeSingle<PackageRow>();

  if (!pkg) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fairway-2">
        Sửa: {pkg.name_vi}
      </h1>
      <div className="mt-6">
        <PackageForm pkg={pkg} action={updatePackage.bind(null, id)} />
      </div>
    </div>
  );
}
