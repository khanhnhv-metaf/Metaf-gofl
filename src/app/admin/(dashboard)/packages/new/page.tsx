import PackageForm from "@/components/admin/PackageForm";
import { createPackage } from "@/lib/admin/actions/packages";

export default function NewPackagePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fairway-2">
        Thêm gói dịch vụ mới
      </h1>
      <div className="mt-6">
        <PackageForm action={createPackage} />
      </div>
    </div>
  );
}
