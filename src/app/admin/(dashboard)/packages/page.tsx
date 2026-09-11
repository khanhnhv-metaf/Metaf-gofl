import Link from "next/link";
import { getAllPackages } from "@/lib/data/packages";
import { deletePackage } from "@/lib/admin/actions/packages";

export default async function AdminPackagesPage() {
  const packages = await getAllPackages();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-fairway-2">
          Gói dịch vụ ({packages.length})
        </h1>
        <Link
          href="/admin/packages/new"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          + Thêm gói dịch vụ
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">Tên (VI)</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Thứ tự</th>
              <th className="px-4 py-3">Nổi bật</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{p.name_vi}</td>
                <td className="px-4 py-3 text-ink-soft">{p.slug}</td>
                <td className="px-4 py-3 text-ink-soft">{p.display_order}</td>
                <td className="px-4 py-3">{p.featured ? "✓" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/packages/${p.id}`}
                      className="font-medium text-fairway-2 hover:underline"
                    >
                      Sửa
                    </Link>
                    <form action={deletePackage.bind(null, p.id)}>
                      <button type="submit" className="font-medium text-red-600 hover:underline">
                        Xoá
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ink-soft">
                  Chưa có gói dịch vụ nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
