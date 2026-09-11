"use client";

import { useActionState } from "react";
import { login } from "@/lib/admin/actions/auth";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form
      action={formAction}
      className="grid w-full max-w-sm gap-4 rounded-2xl border border-line bg-surface p-6"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold text-fairway-2">
          Đăng nhập quản trị
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Zen Homestay Lâm Trường — trang quản lý sân golf &amp; gói dịch vụ.
        </p>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-line bg-background px-3 py-2 outline-none focus:border-fairway-2"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="rounded-lg border border-line bg-background px-3 py-2 outline-none focus:border-fairway-2"
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brass px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
