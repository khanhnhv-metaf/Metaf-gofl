import Link from "next/link";
import { requireAdminUser } from "@/lib/admin/auth";
import { logout } from "@/lib/admin/actions/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <span className="font-display text-lg text-fairway-2">Quản trị</span>
            <Link href="/admin/courses" className="hover:text-fairway-2">
              Sân golf
            </Link>
            <Link href="/admin/packages" className="hover:text-fairway-2">
              Gói dịch vụ
            </Link>
          </nav>
          <div className="flex items-center gap-3 text-sm text-ink-soft">
            <span>{user.email}</span>
            <form action={logout}>
              <button type="submit" className="font-medium text-brass hover:opacity-80">
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
