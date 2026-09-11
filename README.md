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

## Cấu hình Supabase (form liên hệ + dữ liệu sân golf/gói dịch vụ + trang admin)

1. Tạo project tại https://supabase.com.
2. Vào SQL editor, chạy lần lượt:
   - [`supabase/schema.sql`](./supabase/schema.sql) — tạo bảng `leads` (form liên hệ), bảng
     `golf_courses`/`packages` (dữ liệu sân golf & gói dịch vụ, quản lý từ `/admin`), và các
     policy RLS tương ứng (khách xem được, chỉ tài khoản admin đã đăng nhập mới thêm/sửa/xoá).
   - [`supabase/seed.sql`](./supabase/seed.sql) — tuỳ chọn, chèn sẵn 8 sân golf + 3 gói dịch vụ
     hiện có để trang không bị trống trước khi admin cập nhật ảnh/video thật.
3. Tạo tài khoản admin duy nhất: Authentication → Users → **Add user**, nhập email/mật khẩu của
   người sẽ đăng nhập `/admin`, tick **Auto Confirm User**. Trang không có chức năng tự đăng ký.
4. Copy `.env.local.example` thành `.env.local` và điền:

   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

   Lấy 2 giá trị này ở Supabase → Project Settings → API.
5. Xem lead gửi về tại Supabase → Table Editor → `leads`.

## Cấu hình Cloudflare R2 (lưu ảnh/video upload từ trang admin)

Ảnh sân golf/gói dịch vụ và video flycam **không** lưu trên Supabase Storage mà lưu trên
Cloudflare R2 (tránh giới hạn dung lượng file 50MB của Supabase, và không phải nâng cấp gói trả phí
chỉ để tăng giới hạn đó).

Dự án dùng chung bucket R2 có sẵn **`metaf-assets`** (bucket chung cho các project Metaf khác) —
không tạo bucket mới. Mọi file của riêng project này được code tự động lưu dưới prefix
**`metaf-gofl/`** trong bucket đó (xem `src/lib/r2/key.ts`), nên không đụng vào file của project
khác.

1. Bucket `metaf-assets` đã bật **Public Access**. Vào bucket → tab **Settings** → mục
   **Public access** để lấy URL public (dạng `https://pub-xxxxxxxx.r2.dev`, hoặc URL custom domain
   nếu đã gắn) → đây là giá trị cho `NEXT_PUBLIC_R2_PUBLIC_DOMAIN`.
2. **Bắt buộc**: kiểm tra/cấu hình CORS cho bucket để trình duyệt admin upload thẳng lên R2 được
   phép — vẫn ở tab **Settings** → **CORS Policy** → cần có rule cho phép method `PUT` và header
   `Content-Type` từ domain chạy trang admin (vd: `http://localhost:3000` lúc dev, và domain thật
   lúc deploy). Vì bucket dùng chung, rule CORS có thể đã có cho domain của project khác — thêm
   domain của project này vào cùng danh sách `AllowedOrigins` nếu chưa có. Thiếu bước này thì
   upload ảnh/video từ `/admin` sẽ báo lỗi CORS.
3. Tạo API Token: **R2** → **Manage R2 API Tokens** → **Create API Token** → quyền
   **Object Read & Write**, giới hạn vào đúng bucket `metaf-assets`. Cloudflare sẽ cho:
   - **Access Key ID** → `R2_ACCESS_KEY_ID`
   - **Secret Access Key** → `R2_SECRET_ACCESS_KEY`
   - Endpoint dạng `https://<account_id>.r2.cloudflarestorage.com` → `R2_ENDPOINT`
     (`<account_id>` cũng là giá trị cho `R2_ACCOUNT_ID`, chỉ để tham khảo).
   Có thể dùng chung 1 API Token với project Metaf khác nếu đã có sẵn token quyền Read & Write cho
   bucket này, không bắt buộc tạo token riêng.
4. `R2_BUCKET_NAME=metaf-assets`.
5. Điền đủ 6 biến R2 vào `.env.local` (mẫu có sẵn trong `.env.local.example`). Video nên nén
   sang MP4 (H.264) trước khi upload để dung lượng hợp lý — R2 không giới hạn 50MB như Supabase,
   nhưng file càng nhẹ thì tải trang càng nhanh.

## Trang quản trị (`/admin`)

Đăng nhập bằng tài khoản Supabase Auth đã tạo ở bước 3 phần Supabase. Từ `/admin/courses` và
`/admin/packages`, có thể thêm/sửa/xoá sân golf và gói dịch vụ (nội dung song ngữ VI/KR), upload
ảnh và — với mỗi sân golf — 1 video flycam lên Cloudflare R2 (có thanh tiến trình khi tải, xem
`src/lib/r2/` và `src/components/admin/MediaUploader.tsx`). Nội dung cập nhật xong sẽ hiển thị
ngay trên trang chủ, `/golf` và `/golf/[slug]` mà không cần deploy lại.

## Video nền trang chủ (Hero)

Phần đầu trang (Hero) phát video nền tại `public/hero-bg.mp4` (chưa có sẵn trong repo — cần bổ
sung file video thật, khuyến khích cảnh quay flycam ngắn, nén nhẹ, có âm thanh tắt sẵn vì video
luôn ở chế độ `muted`). Nếu file chưa tồn tại hoặc lỗi tải, trang tự động hiện lại ảnh nền
`public/gofl-bg.jpg` như cũ.

## Deploy lên Vercel

1. Push code lên GitHub.
2. Import repo vào https://vercel.com/new.
3. Thêm toàn bộ biến môi trường ở trên (2 biến Supabase + 6 biến R2) vào Project Settings →
   Environment Variables trước khi deploy. Nhớ cập nhật CORS Policy trên bucket R2 để cho phép
   domain thật trên Vercel (không chỉ `localhost:3000`).
4. Vercel tự build bằng `next build` mỗi khi có commit mới.

## Cấu trúc

- `src/app/page.tsx`, `src/app/golf/` — các trang, lấy dữ liệu sân golf/gói dịch vụ từ Supabase
  qua `src/lib/data/` rồi truyền xuống component.
- `src/components/` — Hero, Destination, GolfCourses, Packages, Faq, ContactForm, SiteHeader, SiteFooter.
- `src/lib/data/` — hàm đọc `golf_courses`/`packages` từ Supabase (dùng chung cho các trang public).
- `src/lib/supabaseClient.ts` — Supabase client phía public, dùng anon key (đọc dữ liệu + insert lead).
- `src/app/admin/`, `src/components/admin/`, `src/lib/admin/` — trang quản trị (đăng nhập,
  CRUD sân golf/gói dịch vụ, upload ảnh/video); `src/lib/supabase/` — client Supabase có phiên
  đăng nhập (cookie) dùng riêng cho `/admin`; `src/proxy.ts` — chặn sớm khách chưa đăng nhập khỏi `/admin/*`.
- `src/lib/r2/` — client Cloudflare R2 (S3-compatible), tạo presigned URL, xoá object;
  `src/app/api/admin/presign-upload/`, `.../delete-object/` — Route Handler mà admin gọi để lấy
  URL upload/xoá (yêu cầu đã đăng nhập); ảnh/video sau đó được trình duyệt tải thẳng lên R2.
- `src/app/globals.css` — token màu (fairway/brass/stone) và font theo concept theme.
