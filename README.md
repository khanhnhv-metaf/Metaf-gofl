# Zen Homestay Lâm Trường — Website (Nghỉ dưỡng & Golf, Ba Vì)

Next.js (App Router, TypeScript, Tailwind CSS) landing page giới thiệu Zen Homestay Lâm Trường
và các sân golf lân cận (Đồng Mô, Asean Onsen, Sky Lake), thu thập lead qua form gửi vào Supabase.

Toàn bộ ảnh hiện tại là ảnh placeholder tạm thời (picsum.photos) — thay bằng ảnh thật khi có,
đơn giản bằng cách đổi `src` trong các component ở `src/components/`.

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

## Cấu hình Supabase (form liên hệ)

1. Tạo project tại https://supabase.com.
2. Vào SQL editor, chạy nội dung file [`supabase/schema.sql`](./supabase/schema.sql) để tạo bảng `leads`
   và policy cho phép khách gửi form (insert only, không đọc/sửa/xóa).
3. Copy `.env.local.example` thành `.env.local` và điền:

   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

   Lấy 2 giá trị này ở Supabase → Project Settings → API.
4. Xem lead gửi về tại Supabase → Table Editor → `leads`.

## Deploy lên Vercel

1. Push code lên GitHub.
2. Import repo vào https://vercel.com/new.
3. Thêm 2 biến môi trường ở trên (Project Settings → Environment Variables) trước khi deploy.
4. Vercel tự build bằng `next build` mỗi khi có commit mới.

## Cấu trúc

- `src/app/page.tsx` — ghép các section của trang.
- `src/components/` — Hero, Destination, GolfCourses, Packages, Gallery, Faq, ContactForm, SiteHeader, SiteFooter.
- `src/lib/supabaseClient.ts` — Supabase client dùng anon key (chỉ insert lead).
- `src/app/globals.css` — token màu (fairway/brass/stone) và font theo concept theme.
