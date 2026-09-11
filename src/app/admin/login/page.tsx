import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getAdminUser } from "@/lib/admin/auth";

export default async function AdminLoginPage() {
  const user = await getAdminUser();
  if (user) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <LoginForm />
    </div>
  );
}
