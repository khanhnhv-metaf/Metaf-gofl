import Link from "next/link";
import { getAllGolfCourses } from "@/lib/data/golf-courses";
import { deleteGolfCourse } from "@/lib/admin/actions/golf-courses";

export default async function AdminCoursesPage() {
  const courses = await getAllGolfCourses();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-fairway-2">
          Sân golf ({courses.length})
        </h1>
        <Link
          href="/admin/courses/new"
          className="rounded-full bg-brass px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          + Thêm sân golf
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">Tên (VI)</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Thứ tự</th>
              <th className="px-4 py-3">Trang chủ</th>
              <th className="px-4 py-3">Video</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{c.name_vi}</td>
                <td className="px-4 py-3 text-ink-soft">{c.slug}</td>
                <td className="px-4 py-3 text-ink-soft">{c.display_order}</td>
                <td className="px-4 py-3">{c.featured_on_home ? "✓" : "—"}</td>
                <td className="px-4 py-3">{c.video_url ? "✓" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/courses/${c.id}`}
                      className="font-medium text-fairway-2 hover:underline"
                    >
                      Sửa
                    </Link>
                    <form
                      action={deleteGolfCourse.bind(
                        null,
                        c.id,
                        c.slug,
                        c.featured_on_home
                      )}
                    >
                      <button type="submit" className="font-medium text-red-600 hover:underline">
                        Xoá
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-ink-soft">
                  Chưa có sân golf nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
